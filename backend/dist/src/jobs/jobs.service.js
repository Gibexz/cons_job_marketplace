var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, ForbiddenException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JobStatus } from '../generated/prisma/client.js';
let JobsService = class JobsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createJob(dto, userId) {
        const company = await this.prisma.company.findUnique({
            where: { id: dto.companyId },
        });
        if (!company)
            throw new NotFoundException('Company not found.');
        if (company.ownerId !== userId)
            throw new ForbiddenException('You do not own this company.');
        return this.prisma.job.create({
            data: {
                title: dto.title,
                description: dto.description,
                skills: dto.skills ?? [],
                active: dto.active ?? true,
                status: dto.status ?? JobStatus.ACTIVE,
                lat: dto.lat,
                lng: dto.lng,
                companyId: dto.companyId,
                postedById: userId,
            },
            include: {
                company: { select: { id: true, name: true, logo: true } },
                postedBy: { select: { id: true, name: true, email: true } },
            },
        });
    }
    getAllJobs() {
        return this.prisma.job.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                company: { select: { id: true, name: true, logo: true } },
            },
        });
    }
    getAllActiveJobs() {
        return this.prisma.job.findMany({
            where: { status: JobStatus.ACTIVE },
            orderBy: { createdAt: 'desc' },
            include: {
                company: { select: { id: true, name: true, logo: true } },
            },
        });
    }
    getJobsByUser(userId, status) {
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
                        id: true,
                        status: true,
                        worker: {
                            select: { user: { select: { name: true } } },
                        },
                    },
                },
            },
        });
    }
    async getJobCountsByStatus(userId) {
        const [active, closed, completed, cancelled, draft, all] = await Promise.all([
            this.prisma.job.count({ where: { postedById: userId, status: JobStatus.ACTIVE } }),
            this.prisma.job.count({ where: { postedById: userId, status: JobStatus.CLOSED } }),
            this.prisma.job.count({ where: { postedById: userId, status: JobStatus.COMPLETED } }),
            this.prisma.job.count({ where: { postedById: userId, status: JobStatus.CANCELLED } }),
            this.prisma.job.count({ where: { postedById: userId, status: JobStatus.DRAFT } }),
            this.prisma.job.count({ where: { postedById: userId } }),
        ]);
        return { all, active, closed, completed, cancelled, draft };
    }
    async updateJob(id, userId, dto) {
        const job = await this.prisma.job.findUnique({ where: { id } });
        if (!job)
            throw new NotFoundException('Job not found.');
        if (job.postedById !== userId)
            throw new ForbiddenException('You do not own this job.');
        const active = dto.active !== undefined
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
    async getJobById(id) {
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
    async getJobsForMap() {
        return this.prisma.job.findMany({
            where: {
                status: JobStatus.ACTIVE,
                lat: { not: null },
                lng: { not: null },
            },
            select: {
                id: true, title: true, lat: true, lng: true,
                skills: true, active: true, status: true,
                company: { select: { id: true, name: true } },
            },
        });
    }
    async deleteJob(id, userId) {
        const job = await this.prisma.job.findUnique({ where: { id } });
        if (!job)
            throw new NotFoundException('Job not found.');
        if (job.postedById !== userId)
            throw new ForbiddenException('You do not own this job.');
        await this.prisma.jobApplication.deleteMany({ where: { jobId: id } });
        return this.prisma.job.delete({ where: { id } });
    }
};
JobsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], JobsService);
export { JobsService };
//# sourceMappingURL=jobs.service.js.map