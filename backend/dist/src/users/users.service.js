var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, BadRequestException, UnauthorizedException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
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
        if (dto.email && dto.email !== user.email) {
            const existing = await this.prisma.user.findUnique({
                where: { email: dto.email },
            });
            if (existing) {
                throw new BadRequestException('Email is already in use.');
            }
        }
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
    async changePassword(userId, dto) {
        if (dto.newPassword !== dto.confirmPassword) {
            throw new BadRequestException('New password and confirmation do not match.');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user)
            throw new NotFoundException('User not found.');
        const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Current password is incorrect.');
        }
        const hashed = await bcrypt.hash(dto.newPassword, 12);
        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashed },
        });
        return { message: 'Password updated successfully.' };
    }
};
UsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map