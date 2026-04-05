import { JobsService } from './jobs.service.js';
import { CreateJobDto } from './dto/create-job.dto.js';
import { UpdateJobDto } from './dto/update-job.dto.js';
import { JobStatus } from '../generated/prisma/client.js';
export declare class JobsController {
    private jobsService;
    constructor(jobsService: JobsService);
    getAllJobs(): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        company: {
            id: string;
            name: string;
            logo: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        companyId: string;
        postedById: string;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        status: JobStatus;
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
        title: string;
        description: string;
        companyId: string;
        postedById: string;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        status: JobStatus;
    })[]>;
    getMyJobs(req: any, status?: JobStatus): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
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
        title: string;
        description: string;
        companyId: string;
        postedById: string;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        status: JobStatus;
    })[]>;
    getMyJobCounts(req: any): Promise<{
        all: number;
        active: number;
        closed: number;
        completed: number;
        cancelled: number;
        draft: number;
    }>;
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
    createJob(dto: CreateJobDto, req: any): Promise<{
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
        title: string;
        description: string;
        companyId: string;
        postedById: string;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        status: JobStatus;
    }>;
    getJobById(id: string): Promise<{
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
                lat: number | null;
                lng: number | null;
                skills: string[];
                userId: string;
                experience: import("../generated/prisma/enums.js").ExperienceLevel;
                available: boolean;
                bio: string | null;
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
        title: string;
        description: string;
        companyId: string;
        postedById: string;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        status: JobStatus;
    }>;
    updateJob(id: string, dto: UpdateJobDto, req: any): Promise<{
        company: {
            id: string;
            name: string;
            logo: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        companyId: string;
        postedById: string;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        status: JobStatus;
    }>;
    deleteJob(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        companyId: string;
        postedById: string;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        status: JobStatus;
    }>;
}
