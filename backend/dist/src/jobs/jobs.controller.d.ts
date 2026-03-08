import { JobsService } from './jobs.service.js';
import { CreateJobDto } from './dto/create-job.dto.js';
export declare class JobsController {
    private jobsService;
    constructor(jobsService: JobsService);
    createJob(dto: CreateJobDto, req: any): import("../generated/prisma/models.js").Prisma__JobClient<{
        id: string;
        title: string;
        description: string;
        company: string | null;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        createdAt: Date;
        postedById: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    getMyJobs(req: any): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: string;
        title: string;
        description: string;
        company: string | null;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        createdAt: Date;
        postedById: string;
    }[]>;
    getJobById(id: string): Promise<{
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
                userId: string;
                experience: import("../generated/prisma/enums.js").ExperienceLevel;
                available: boolean;
                bio: string | null;
                updatedAt: Date;
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
        company: string | null;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        createdAt: Date;
        postedById: string;
    }>;
    getJobsForMap(): Promise<{
        id: string;
        title: string;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
    }[]>;
}
