import { UsersService } from './users.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    getMe(req: any): Promise<{
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
    updateMe(req: any, dto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        country: string | null;
        createdAt: Date;
        profilePhoto: string | null;
    }>;
    changePassword(req: any, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
