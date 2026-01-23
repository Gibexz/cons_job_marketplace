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
        postedById: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
}
