import { JobsService } from './jobs.service.js';
import { CreateJobDto } from './dto/create-job.dto.js';
export declare class JobsController {
    private jobsService;
    constructor(jobsService: JobsService);
    createJob(dto: CreateJobDto, req: any): import("../generated/prisma/models.js").Prisma__JobClient<{
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        company: string | null;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        postedById: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    getMyJobs(req: any): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        company: string | null;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
        postedById: string;
    }[]>;
    getJobById(id: string): Promise<{
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
            status: import("../generated/prisma/enums.js").JobWorkerStatus;
            jobId: string;
            workerId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        company: string | null;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
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
