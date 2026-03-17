import { PrismaService } from '../prisma/prisma.service.js';
import { CreateJobDto } from './dto/create-job.dto.js';
export declare class JobsService {
    private prisma;
    constructor(prisma: PrismaService);
    createJob(dto: CreateJobDto, userId: string): Promise<{
        company: {
            id: string;
            name: string;
            logo: string | null;
        };
        postedBy: {
            id: string;
            name: string;
            email: string;
        };
    } & {
        id: string;
        title: string;
        description: string;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        createdAt: Date;
        companyId: string;
        postedById: string;
    }>;
    getJobsByUser(userId: string): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        company: {
            id: string;
            name: string;
            logo: string | null;
        };
    } & {
        id: string;
        title: string;
        description: string;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        createdAt: Date;
        companyId: string;
        postedById: string;
    })[]>;
    getJobById(id: string): Promise<({
        company: {
            id: string;
            name: string;
            logo: string | null;
            address: string | null;
            rating: number;
        };
        postedBy: {
            id: string;
            name: string;
            email: string;
        };
        workers: ({
            worker: {
                user: {
                    id: string;
                    name: string;
                    email: string;
                };
            } & {
                id: string;
                lat: number | null;
                lng: number | null;
                skills: string[];
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                experience: import("../generated/prisma/enums.js").ExperienceLevel;
                available: boolean;
                bio: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            jobId: string;
            workerId: string;
            status: import("../generated/prisma/enums.js").JobWorkerStatus;
        })[];
    } & {
        id: string;
        title: string;
        description: string;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        createdAt: Date;
        companyId: string;
        postedById: string;
    }) | null>;
    getJobsForMap(): Promise<{
        id: string;
        title: string;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        company: {
            id: string;
            name: string;
        };
    }[]>;
    deleteJob(id: string, userId: string): Promise<{
        id: string;
        title: string;
        description: string;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        createdAt: Date;
        companyId: string;
        postedById: string;
    }>;
}
