var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let JobsService = class JobsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    createJob(data, userId) {
        return this.prisma.job.create({
            data: {
                title: data.title,
                description: data.description,
                postedById: userId,
            },
        });
    }
    getJobsByUser(userId) {
        return this.prisma.job.findMany({
            where: { postedById: userId },
            orderBy: { createdAt: 'desc' },
        });
    }
};
JobsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], JobsService);
export { JobsService };
//# sourceMappingURL=jobs.service.js.map