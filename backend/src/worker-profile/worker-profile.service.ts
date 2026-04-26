import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
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

  async getWorkersForMap() {
    return this.prisma.workerProfile.findMany({
      where: {
        lat: { not: null },
        lng: { not: null },
        available: true,
      },
      select: {
        id: true,
        lat: true,
        lng: true,
        skills: true,
        experience: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async matchBySkills(skills: string[]): Promise<any[]> {
    return this.prisma.workerProfile.findMany({
      where: {
        skills: {
          hasSome: skills,
        },
      },
      include: {
        user: {
          select: { name: true, email: true, phone: true },
        },
      },
    });
  } // ← this brace was missing, causing getAll to be swallowed inside matchBySkills

  async getAll() {
    return this.prisma.workerProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

// ── Get single worker profile by ID (public) ──────────────────
async getWorkerById(workerId: string) {
  const worker = await this.prisma.workerProfile.findUnique({
    where: { id: workerId },
    include: {
      user: {
        select: {
          id:        true,
          name:      true,
          email:     true,
          country:   true,
          createdAt: true,
        },
      },
      // Job history with status and company info
      applications: {
        include: {
          job: {
            include: {
              company: {
                select: {
                  id:     true,
                  name:   true,
                  logo:   true,
                  rating: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!worker) throw new NotFoundException('Worker profile not found.');
  return worker;
}

}


