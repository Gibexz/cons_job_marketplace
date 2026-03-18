import { JobsService } from './jobs.service.js';
import { CreateJobDto } from './dto/create-job.dto.js';
export declare class JobsController {
    private jobsService;
    constructor(jobsService: JobsService);
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
        skills: string[];
        active: boolean;
        lat: number | null;
        lng: number | null;
        postedById: string;
    }>;
    getMyJobs(req: any): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
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
        skills: string[];
        active: boolean;
        lat: number | null;
        lng: number | null;
        postedById: string;
    })[]>;
    getJobsForMap(): Promise<{
        company: {
            id: string;
            name: string;
        };
        id: string;
        title: string;
        skills: string[];
        active: boolean;
        lat: number | null;
        lng: number | null;
    }[]>;
    getJobById(id: string): Promise<{
        company: {
            id: string;
            name: string;
            logo: string | null;
            address: string | null;
            rating: number;
        };
        postedBy: {
            id: string;
            email: string;
            name: string;
        };
        workers: ({
            worker: {
                user: {
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
                updatedAt: Date;
                userId: string;
                experience: import("../generated/prisma/enums.js").ExperienceLevel;
                available: boolean;
                bio: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            status: import("../generated/prisma/enums.js").JobWorkerStatus;
            jobId: string;
            workerId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        companyId: string;
        skills: string[];
        active: boolean;
        lat: number | null;
        lng: number | null;
        postedById: string;
    }>;
    deleteJob(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        companyId: string;
        skills: string[];
        active: boolean;
        lat: number | null;
        lng: number | null;
        postedById: string;
    }>;
}
