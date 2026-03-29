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
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        skills: string[];
        lat: number | null;
        lng: number | null;
        title: string;
        description: string;
        companyId: string;
        active: boolean;
        status: JobStatus;
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
        createdAt: Date;
        skills: string[];
        lat: number | null;
        lng: number | null;
        title: string;
        description: string;
        companyId: string;
        active: boolean;
        status: JobStatus;
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
        createdAt: Date;
        skills: string[];
        lat: number | null;
        lng: number | null;
        title: string;
        description: string;
        companyId: string;
        active: boolean;
        status: JobStatus;
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
        createdAt: Date;
        skills: string[];
        lat: number | null;
        lng: number | null;
        title: string;
        description: string;
        companyId: string;
        active: boolean;
        status: JobStatus;
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
        createdAt: Date;
        skills: string[];
        lat: number | null;
        lng: number | null;
        title: string;
        description: string;
        companyId: string;
        active: boolean;
        status: JobStatus;
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
        applications: ({
            worker: {
                user: {
                    id: string;
                    email: string;
                    name: string;
                };
            } & {
                id: string;
                createdAt: Date;
                userId: string;
                skills: string[];
                experience: import("../generated/prisma/enums.js").ExperienceLevel;
                available: boolean;
                bio: string | null;
                lat: number | null;
                lng: number | null;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            status: import("../generated/prisma/enums.js").JobApplicationStatus;
            jobId: string;
            workerId: string;
        })[];
        postedBy: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        skills: string[];
        lat: number | null;
        lng: number | null;
        title: string;
        description: string;
        companyId: string;
        active: boolean;
        status: JobStatus;
        postedById: string;
    }) | null>;
    getJobsForMap(): Promise<{
        company: {
            id: string;
            name: string;
        };
        id: string;
        skills: string[];
        lat: number | null;
        lng: number | null;
        title: string;
        active: boolean;
        status: JobStatus;
    }[]>;
    deleteJob(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        skills: string[];
        lat: number | null;
        lng: number | null;
        title: string;
        description: string;
        companyId: string;
        active: boolean;
        status: JobStatus;
        postedById: string;
    }>;
}
