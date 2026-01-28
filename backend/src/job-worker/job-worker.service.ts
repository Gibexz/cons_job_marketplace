import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JobWorkerStatus } from '../generated/prisma/client.js';

@Injectable()
export class JobWorkerService {
    constructor(private prisma: PrismaService) {}

    // client invites worker
    async inviteWorker(jobId: string, clientId: string, workProfileId: string){
        const job = await this.prisma.job.findUnique({
            where: { id: jobId }
        });

        if (!job) throw new ForbiddenException('Job not found')

        if (job.postedById !== clientId) {
            throw new ForbiddenException('Not Your Job')
        }

        return this.prisma.jobWorker.create({
            data: {
                jobId,
                workerId: workProfileId,
            },
        });
    }

    
    // Worker responds to invite

}
