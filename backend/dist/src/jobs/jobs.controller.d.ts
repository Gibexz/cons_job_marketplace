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
    getMyJobCounts(req: any): Promise<{
        all: number;
        active: number;
        closed: number;
        completed: number;
        cancelled: number;
        draft: number;
    }>;
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
    deleteJob(id: string, req: any): Promise<{
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
