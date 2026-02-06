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

        if (!job) throw new ForbiddenException('Job not found');

        if (job.postedById !== clientId) {
            throw new ForbiddenException('Not Your Job');
        }

        return this.prisma.jobWorker.create({
            data: {
                jobId,
                workerId: workProfileId,
            },
        });
    }

    
    // Worker responds to invite
    async respondToInvite(
        jobWorkerId: string,
        userId: string,
        status: JobWorkerStatus
    ) {
        const record = await this.prisma.jobWorker.findUnique({
            where: {id: jobWorkerId},
            include: { worker: true }
        });

        if (!record) throw new ForbiddenException('Invite record not found');

        if (record.worker.userId !== userId) {
            throw new ForbiddenException('Not Your Invitation');
        }
            
        return this.prisma.jobWorker.update({
            where: { id: jobWorkerId },
            data: { status },
        });
    }

    // View team for a job
    async getJobTeam(jobId: string) {
        return this.prisma.jobWorker.findMany({
            where: {
                jobId,
                status: JobWorkerStatus.ACCEPTED,
            },
            include: {
                worker: {
                    include: {user: true},
                },
            },
        });
    }

}
