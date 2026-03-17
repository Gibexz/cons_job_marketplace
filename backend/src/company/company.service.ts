import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCompanyDto } from './dto/create-company.dto.js';
import { UpdateCompanyDto } from './dto/update-company.dto.js';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  // ── Create ────────────────────────────────────────────
  async create(userId: string, dto: CreateCompanyDto) {
    const count = await this.prisma.company.count({
      where: { ownerId: userId },
    });

    if (count >= 5) {
      throw new BadRequestException(
        'You have reached the maximum limit of 5 companies.',
      );
    }

    return this.prisma.company.create({
      data: {
        ...dto,
        ownerId: userId,
      },
    });
  }

  // ── Get All My Companies ──────────────────────────────
  async getMyCompanies(userId: string) {
    return this.prisma.company.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { jobs: true },
        },
      },
    });
  }

  // ── Get Single Company ────────────────────────────────
  async getOne(userId: string, companyId: string) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      include: {
        _count: {
          select: { jobs: true },
        },
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found.');
    }

    // Ensure user owns this company
    if (company.ownerId !== userId) {
      throw new ForbiddenException('You do not own this company.');
    }

    return company;
  }

  // ── Update ────────────────────────────────────────────
async update(userId: string, companyId: string, dto: UpdateCompanyDto) {
  const company = await this.prisma.company.findUnique({
    where: { id: companyId },
  });

  if (!company) {
    throw new NotFoundException('Company not found.');
  }

  if (company.ownerId !== userId) {
    throw new ForbiddenException(
      'You do not have permission to update this company.',
    );
  }

  // Explicitly pick only allowed fields — name is intentionally excluded
  const { logo, address } = dto;

  return this.prisma.company.update({
    where: { id: companyId },
    data: {
      ...(logo    !== undefined && { logo }),
      ...(address !== undefined && { address }),
    },
  });
}

  // ── Get Company Count ─────────────────────────────────
  async getCompanyCount(userId: string): Promise<number> {
    return this.prisma.company.count({
      where: { ownerId: userId },
    });
  }
}