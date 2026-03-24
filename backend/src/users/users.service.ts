import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // ── Get current user profile ──────────────────────────────
  // Excludes password — never expose it
  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id:        true,
        name:      true,
        email:     true,
        country:   true,
        createdAt: true,
        // Include counts for dashboard context
        _count: {
          select: {
            jobs:    true,
            company: true,
          },
        },
        // Include worker profile if exists
        workerProfile: {
          select: {
            id:         true,
            skills:     true,
            experience: true,
            available:  true,
            bio:        true,
            lat:        true,
            lng:        true,
          },
        },
        // Include companies owned
        company: {
          select: {
            id:      true,
            name:    true,
            logo:    true,
            address: true,
            rating:  true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  // ── Update current user profile ───────────────────────────
  async updateMe(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('User not found.');

    return this.prisma.user.update({
      where: { id: userId },
      data:  dto,
      select: {
        id:        true,
        name:      true,
        email:     true,
        country:   true,
        createdAt: true,
      },
    });
  }
}