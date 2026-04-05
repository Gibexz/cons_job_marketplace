import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // ── Get current user profile ──────────────────────────────
  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        profilePhoto: true,
        createdAt: true,
        _count: {
          select: {
            jobs: true,
            company: true,
          },
        },
        workerProfile: {
          select: {
            id: true,
            skills: true,
            experience: true,
            available: true,
            bio: true,
            lat: true,
            lng: true,
          },
        },
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            address: true,
            rating: true,
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

    // Check email uniqueness if being changed
    if (dto.email && dto.email !== user.email) {
      const existing = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (existing) {
        throw new BadRequestException('Email is already in use.');
      }
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        profilePhoto: true,
        createdAt: true,
      },
    });
  }

  // ── Change password ───────────────────────────────────────
  async changePassword(userId: string, dto: ChangePasswordDto) {
    // Validate passwords match before hitting the DB
    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException(
        'New password and confirmation do not match.',
      );
    }

    // Fetch user with password for comparison
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('User not found.');

    // Verify current password
    const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Current password is incorrect.');
    }

    // Hash new password
    const hashed = await bcrypt.hash(dto.newPassword, 12);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return { message: 'Password updated successfully.' };
  }
}
