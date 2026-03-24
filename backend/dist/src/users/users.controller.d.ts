import { UsersService } from './users.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    getMe(req: any): Promise<{
        id: string;
        email: string;
        name: string;
        country: string | null;
        createdAt: Date;
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
        _count: {
            jobs: number;
            company: number;
        };
    }>;
    updateMe(req: any, dto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        country: string | null;
        createdAt: Date;
    }>;
}
