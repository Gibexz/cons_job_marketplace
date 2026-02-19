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
        createdAt: Date;
        postedById: string;
    }[]>;
}
