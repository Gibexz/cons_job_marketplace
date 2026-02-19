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
}
