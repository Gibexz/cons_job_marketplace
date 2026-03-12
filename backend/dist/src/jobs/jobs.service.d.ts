import { PrismaService } from '../prisma/prisma.service.js';
export declare class JobsService {
    private prisma;
    constructor(prisma: PrismaService);
    createJob(data: any, userId: string): import("../generated/prisma/models.js").Prisma__JobClient<{
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
    getJobsByUser(userId: string): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
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
    getJobById(id: string): Promise<({
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
    }) | null>;
    getJobsForMap(): Promise<{
        id: string;
        title: string;
        lat: number | null;
        lng: number | null;
        skills: string[];
        active: boolean;
    }[]>;
    deleteJob(id: string, userId: string): Promise<{
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
}
