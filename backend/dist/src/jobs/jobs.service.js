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
let JobsService = class JobsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createJob(dto, userId) {
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
                    select: {
                        id: true,
                        name: true,
                        logo: true,
                    },
                },
                postedBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    getJobsByUser(userId) {
        return this.prisma.job.findMany({
            where: { postedById: userId },
            orderBy: { createdAt: 'desc' },
            include: {
                company: {
                    select: {
                        id: true,
                        name: true,
                        logo: true,
                    },
                },
            },
        });
    }
    async getJobById(id) {
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
                    select: {
                        id: true,
                        name: true,
                        email: true,
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
                active: true,
            },
            select: {
                id: true,
                title: true,
                lat: true,
                lng: true,
                skills: true,
                active: true,
                company: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }
    async deleteJob(id, userId) {
        const job = await this.prisma.job.findUnique({ where: { id } });
        if (!job) {
            throw new NotFoundException('Job not found.');
        }
        if (job.postedById !== userId) {
            throw new ForbiddenException('You do not own this job.');
        }
        return this.prisma.job.delete({ where: { id } });
    }
};
JobsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], JobsService);
export { JobsService };
//# sourceMappingURL=jobs.service.js.map