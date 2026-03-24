var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMe(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                country: true,
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
        if (!user)
            throw new NotFoundException('User not found.');
        return user;
    }
    async updateMe(userId, dto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user)
            throw new NotFoundException('User not found.');
        return this.prisma.user.update({
            where: { id: userId },
            data: dto,
            select: {
                id: true,
                name: true,
                email: true,
                country: true,
                createdAt: true,
            },
        });
    }
};
UsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map