// import {
//   Injectable,
//   NotFoundException,
//   ForbiddenException,
//   BadRequestException,
// } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service.js';
// import { CreateJobDto } from './dto/create-job.dto.js';

// @Injectable()
// export class JobsService {
//   constructor(private prisma: PrismaService) {}

//   // ── Create Job ────────────────────────────────────────────
//   async createJob(dto: CreateJobDto, userId: string) {
//     // Verify the company exists and belongs to this user
//     const company = await this.prisma.company.findUnique({
//       where: { id: dto.companyId },
//     });

//     if (!company) {
//       throw new NotFoundException('Company not found.');
//     }

//     if (company.ownerId !== userId) {
//       throw new ForbiddenException(
//         'You do not own this company.',
//       );
//     }

//     return this.prisma.job.create({
//       data: {
//         title:       dto.title,
//         description: dto.description,
//         skills:      dto.skills,
//         active:      dto.active,
//         lat:         dto.lat,
//         lng:         dto.lng,
//         companyId:   dto.companyId, // ← relation via companyId
//         postedById:  userId,        // ← relation via postedById
//       },
//       // Return job with company and poster details
//       include: {
//         company: {
//           select: {
//             id:   true,
//             name: true,
//             logo: true,
//           },
//         },
//         postedBy: {
//           select: {
//             id:    true,
//             name:  true,
//             email: true,
//           },
//         },
//       },
//     });
//   }

//   // ── Get Jobs By User ──────────────────────────────────────
//   getJobsByUser(userId: string) {
//     return this.prisma.job.findMany({
//       where: { postedById: userId },
//       orderBy: { createdAt: 'desc' },
//       include: {
//         company: {
//           select: {
//             id:   true,
//             name: true,
//             logo: true,
//           },
//         },
//       },
//     });
//   }

//   // ── Get Job By ID ─────────────────────────────────────────
//   async getJobById(id: string) {
//     return this.prisma.job.findUnique({
//       where: { id },
//       include: {
//         company: {
//           select: {
//             id:      true,
//             name:    true,
//             logo:    true,
//             address: true,
//             rating:  true,
//           },
//         },
//         postedBy: {
//           select: {
//             id:    true,
//             name:  true,
//             email: true,
//           },
//         },
//         workers: {
//           include: {
//             worker: {
//               include: {
//                 user: {
//                   select: {
//                     id:    true,
//                     name:  true,
//                     email: true,
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     });
//   }

//   // ── Get Jobs For Map ──────────────────────────────────────
//   async getJobsForMap() {
//     return this.prisma.job.findMany({
//       where: {
//         lat:    { not: null },
//         lng:    { not: null },
//         active: true,
//       },
//       select: {
//         id:     true,
//         title:  true,
//         lat:    true,
//         lng:    true,
//         skills: true,
//         active: true,
//         company: {
//           select: {
//             id:   true,
//             name: true,
//           },
//         },
//       },
//     });
//   }

//   // ── Delete Job ────────────────────────────────────────────
//   async deleteJob(id: string, userId: string) {
//     const job = await this.prisma.job.findUnique({ where: { id } });

//     if (!job) {
//       throw new NotFoundException('Job not found.');
//     }

//     if (job.postedById !== userId) {
//       throw new ForbiddenException('You do not own this job.');
//     }

//     return this.prisma.job.delete({ where: { id } });
//   }
// }

import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateJobDto } from './dto/create-job.dto.js';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  // ── Create Job ────────────────────────────────────────────
  async createJob(dto: CreateJobDto, userId: string) {
    const company = await this.prisma.company.findUnique({
      where: { id: dto.companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found.');
    }

    if (company.ownerId !== userId) {
      throw new ForbiddenException('You do not own this company.');
    }

    return this.prisma.job.create({
      data: {
        title: dto.title,
        description: dto.description,
        skills: dto.skills,
        active: dto.active,
        lat: dto.lat,
        lng: dto.lng,
        companyId: dto.companyId,
        postedById: userId,
      },
      include: {
        company: {
          select: { id: true, name: true, logo: true },
        },
        postedBy: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  // ── Get All Active Jobs ───────────────────────────────────
  // Used by the public active jobs listing page.
  getAllActiveJobs() {
    return this.prisma.job.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
      include: {
        company: {
          select: { id: true, name: true, logo: true },
        },
      },
    });
  }

  // ── Get Jobs By User ──────────────────────────────────────
  getJobsByUser(userId: string) {
    return this.prisma.job.findMany({
      where: { postedById: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        company: {
          select: { id: true, name: true, logo: true },
        },
      },
    });
  }

  // ── Get Job By ID ─────────────────────────────────────────
  async getJobById(id: string) {
    return this.prisma.job.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            address: true,
            rating: true,
          },
        },
        postedBy: {
          select: { id: true, name: true, email: true },
        },
        workers: {
          include: {
            worker: {
              include: {
                user: {
                  select: { id: true, name: true, email: true },
                },
              },
            },
          },
        },
      },
    });
  }

  // ── Get Jobs For Map ──────────────────────────────────────
  async getJobsForMap() {
    return this.prisma.job.findMany({
      where: { lat: { not: null }, lng: { not: null }, active: true },
      select: {
        id: true,
        title: true,
        lat: true,
        lng: true,
        skills: true,
        active: true,
        company: {
          select: { id: true, name: true },
        },
      },
    });
  }

  // ── Delete Job ────────────────────────────────────────────
  async deleteJob(id: string, userId: string) {
    const job = await this.prisma.job.findUnique({ where: { id } });

    if (!job) throw new NotFoundException('Job not found.');
    if (job.postedById !== userId)
      throw new ForbiddenException('You do not own this job.');

    return this.prisma.job.delete({ where: { id } });
  }
}
