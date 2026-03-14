import { Injectable,
  NotFoundException,
  ForbiddenException,
 } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  createJob(data: any, userId: string) {
    return this.prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
        skills: data.skills,
        lat: data.lat,
        lng: data.lng,
        companyId: data.company,
        postedById: userId,
      },
    });
  }
  getJobsByUser(userId: string) {
    return this.prisma.job.findMany({
      where: { postedById: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getJobById(id: string) {
    return this.prisma.job.findUnique({
      where: { id },
      include: {
        postedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            // Exclude password!
          },
        },

        workers: {
          include: {
            worker: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getJobsForMap() {
    return this.prisma.job.findMany({
      where: {
        lat: { not: null },
        lng: { not: null },
      },
      select: {
        id: true,
        title: true,
        lat: true,
        lng: true,
        skills: true,
        active: true,
      },
    });
  }

  async deleteJob(id: string, userId: string) {
  // Verify the job belongs to the requesting user before deleting
    const job = await this.prisma.job.findUnique({ where: { id } });

    if (!job) throw new NotFoundException('Job not found');

    if (job.postedById !== userId) {
      throw new ForbiddenException('You do not own this job');
  }

  return this.prisma.job.delete({ where: { id } });
}

}
