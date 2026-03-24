import { PrismaService } from '../prisma/prisma.service.js';
import { CreateJobDto } from './dto/create-job.dto.js';
import { UpdateJobDto } from './dto/update-job.dto.js';
import { JobStatus } from '../generated/prisma/client.js';
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
        status: JobStatus;
        createdAt: Date;
        companyId: string;
        postedById: string;
    }>;
    getAllJobs(): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
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
        status: JobStatus;
        createdAt: Date;
        companyId: string;
        postedById: string;
    })[]>;
    getAllActiveJobs(): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
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
        status: JobStatus;
        createdAt: Date;
        companyId: string;
        postedById: string;
    })[]>;
    getJobsByUser(userId: string, status?: JobStatus): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        company: {
            id: string;
            name: string;
            logo: string | null;
        };
        applications: {
            id: string;
            status: import("../generated/prisma/enums.js").JobApplicationStatus;
            worker: {
                user: {
                    name: string;
                };
            };
        }[];
    } & {
        id: string;
        title: string;
        description: string;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        status: JobStatus;
        createdAt: Date;
        companyId: string;
        postedById: string;
    })[]>;
    getJobCountsByStatus(userId: string): Promise<{
        all: number;
        active: number;
        closed: number;
        completed: number;
        cancelled: number;
        draft: number;
    }>;
    updateJob(id: string, userId: string, dto: UpdateJobDto): Promise<{
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
        status: JobStatus;
        createdAt: Date;
        companyId: string;
        postedById: string;
    }>;
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
        applications: ({
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
            status: import("../generated/prisma/enums.js").JobApplicationStatus;
            createdAt: Date;
            jobId: string;
            workerId: string;
        })[];
    } & {
        id: string;
        title: string;
        description: string;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        status: JobStatus;
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
        status: JobStatus;
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
        status: JobStatus;
        createdAt: Date;
        companyId: string;
        postedById: string;
    }>;
}
