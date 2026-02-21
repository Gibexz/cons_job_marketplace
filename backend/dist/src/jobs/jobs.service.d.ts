import { PrismaService } from '../prisma/prisma.service.js';
export declare class JobsService {
    private prisma;
    constructor(prisma: PrismaService);
    createJob(data: any, userId: string): import("../generated/prisma/models.js").Prisma__JobClient<{
        id: string;
        title: string;
        description: string;
        company: string | null;
        createdAt: Date;
        postedById: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    getJobsByUser(userId: string): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: string;
        title: string;
        description: string;
        company: string | null;
        createdAt: Date;
        postedById: string;
    }[]>;
    getJobById(id: string): Promise<({
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
                createdAt: Date;
                userId: string;
                skills: string[];
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
        createdAt: Date;
        postedById: string;
    }) | null>;
}
