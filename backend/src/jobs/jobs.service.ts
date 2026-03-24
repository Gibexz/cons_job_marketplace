import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateJobDto }  from './dto/create-job.dto.js';
import { UpdateJobDto }  from './dto/update-job.dto.js';
import { JobStatus }     from '../generated/prisma/client.js';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  // ── Create Job ────────────────────────────────────────────
  async createJob(dto: CreateJobDto, userId: string) {
    const company = await this.prisma.company.findUnique({
      where: { id: dto.companyId },
    });

    if (!company) throw new NotFoundException('Company not found.');
    if (company.ownerId !== userId) throw new ForbiddenException('You do not own this company.');

    return this.prisma.job.create({
      data: {
        title:       dto.title,
        description: dto.description,
        skills:      dto.skills  ?? [],
        active:      dto.active  ?? true,
        status:      dto.status  ?? JobStatus.ACTIVE,
        lat:         dto.lat,
        lng:         dto.lng,
        companyId:   dto.companyId,
        postedById:  userId,
      },
      include: {
        company:  { select: { id: true, name: true, logo: true } },
        postedBy: { select: { id: true, name: true, email: true } },
      },
    });
  }

  // ── Get All Jobs — public, all statuses ───────────────────
  getAllJobs() {
    return this.prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        company: { select: { id: true, name: true, logo: true } },
      },
    });
  }

  // ── Get All Active Jobs — public ──────────────────────────
  getAllActiveJobs() {
    return this.prisma.job.findMany({
      where:   { status: JobStatus.ACTIVE },
      orderBy: { createdAt: 'desc' },
      include: {
        company: { select: { id: true, name: true, logo: true } },
      },
    });
  }

  // ── Get Jobs By User — optionally filtered by status ──────
  getJobsByUser(userId: string, status?: JobStatus) {
    return this.prisma.job.findMany({
      where: {
        postedById: userId,
        ...(status ? { status } : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: {
        company: { select: { id: true, name: true, logo: true } },
        applications: {
          select: {
            id:     true,
            status: true,
            worker: {
              select: { user: { select: { name: true } } },
            },
          },
        },
      },
    });
  }

  // ── Get Job Counts By Status ──────────────────────────────
  async getJobCountsByStatus(userId: string) {
    const [active, closed, completed, cancelled, draft, all] =
      await Promise.all([
        this.prisma.job.count({ where: { postedById: userId, status: JobStatus.ACTIVE    } }),
        this.prisma.job.count({ where: { postedById: userId, status: JobStatus.CLOSED    } }),
        this.prisma.job.count({ where: { postedById: userId, status: JobStatus.COMPLETED } }),
        this.prisma.job.count({ where: { postedById: userId, status: JobStatus.CANCELLED } }),
        this.prisma.job.count({ where: { postedById: userId, status: JobStatus.DRAFT     } }),
        this.prisma.job.count({ where: { postedById: userId } }),
      ]);

    return { all, active, closed, completed, cancelled, draft };
  }

  // ── Update Job ────────────────────────────────────────────
  async updateJob(id: string, userId: string, dto: UpdateJobDto) {
    const job = await this.prisma.job.findUnique({ where: { id } });

    if (!job)                      throw new NotFoundException('Job not found.');
    if (job.postedById !== userId) throw new ForbiddenException('You do not own this job.');

    const active =
      dto.active !== undefined
        ? dto.active
        : dto.status !== undefined
        ? dto.status === JobStatus.ACTIVE
        : undefined;

    return this.prisma.job.update({
      where: { id },
      data: {
        ...dto,
        ...(active !== undefined ? { active } : {}),
      },
      include: {
        company: { select: { id: true, name: true, logo: true } },
      },
    });
  }

  // ── Get Job By ID ─────────────────────────────────────────
  async getJobById(id: string) {
    return this.prisma.job.findUnique({
      where: { id },
      include: {
        company: {
          select: { id: true, name: true, logo: true, address: true, rating: true },
        },
        postedBy: {
          select: { id: true, name: true, email: true },
        },
        applications: {
          include: {
            worker: {
              include: {
                user: { select: { id: true, name: true, email: true } },
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
      where: {
        status: JobStatus.ACTIVE,
        lat:    { not: null },
        lng:    { not: null },
      },
      select: {
        id: true, title: true, lat: true, lng: true,
        skills: true, active: true, status: true,
        company: { select: { id: true, name: true } },
      },
    });
  }

  // ── Delete Job ────────────────────────────────────────────
  async deleteJob(id: string, userId: string) {
    const job = await this.prisma.job.findUnique({ where: { id } });

    if (!job)                      throw new NotFoundException('Job not found.');
    if (job.postedById !== userId) throw new ForbiddenException('You do not own this job.');

    await this.prisma.jobApplication.deleteMany({ where: { jobId: id } });
    return this.prisma.job.delete({ where: { id } });
  }
}