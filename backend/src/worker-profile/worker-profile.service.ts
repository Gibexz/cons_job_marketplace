import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class WorkerProfileService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: any) {
    const existing = await this.prisma.workerProfile.findUnique({
      where: { userId },
    });

    if (existing) {
      throw new BadRequestException('Worker profile already exists');
    }

    return this.prisma.workerProfile.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async getMyProfile(userId: string) {
    return this.prisma.workerProfile.findUnique({
      where: { userId },
    });
  }

  async update(userId: string, data: any) {
    return this.prisma.workerProfile.update({
      where: { userId },
      data,
    });
  }

  async getAllAvailableWorkers() {
    return this.prisma.workerProfile.findMany({
      where: { available: true },
      include: { user: true },
    });
  }
}
