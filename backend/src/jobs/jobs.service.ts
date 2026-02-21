import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  createJob(data: any, userId: string) {
    return this.prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
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
}
