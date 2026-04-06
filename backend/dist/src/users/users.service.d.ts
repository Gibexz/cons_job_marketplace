import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getMe(userId: string): Promise<{
        workerProfile: {
            id: string;
            skills: string[];
            experience: import("../generated/prisma/enums.js").ExperienceLevel;
            available: boolean;
            bio: string | null;
            lat: number | null;
            lng: number | null;
        } | null;
        company: {
            id: string;
            name: string;
            logo: string | null;
            address: string | null;
            rating: number;
        }[];
        id: string;
        email: string;
        name: string;
        country: string | null;
        createdAt: Date;
        profilePhoto: string | null;
        _count: {
            company: number;
            jobs: number;
        };
    }>;
    updateMe(userId: string, dto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        country: string | null;
        createdAt: Date;
        profilePhoto: string | null;
    }>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
