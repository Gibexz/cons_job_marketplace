import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: any) {

    const count = await this.prisma.company.count({
      where: { ownerId: userId },
    });

    if (count >= 5) {
      throw new BadRequestException(
        'Maximum of 5 companies allowed',
      );
    }

    return this.prisma.company.create({
      data: {
        ...dto,
        ownerId: userId,
      },
    });
  }

  async getMyCompanies(userId: string) {
    return this.prisma.company.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
