import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class InvitesService {
  constructor(private prisma: PrismaService) {}

  // ── Send an invite ───────────────────────────────────────
  // Only the job owner can invite workers
  // Creates a JobApplication record with status INVITED
  async sendInvite(jobId: string, workerId: string, ownerId: string) {

    // 1. Verify job exists and requester is the owner
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) throw new NotFoundException('Job not found.');

    if (job.postedById !== ownerId) {
      throw new ForbiddenException('Only the job owner can invite workers.');
    }

    // 2. Verify the worker profile exists
    const workerProfile = await this.prisma.workerProfile.findUnique({
      where: { id: workerId },
    });

    if (!workerProfile) {
      throw new NotFoundException('Worker profile not found.');
    }

    // 3. Check for existing JobApplication record
    const existing = await this.prisma.jobApplication.findUnique({
      where: {
        jobId_workerId: { jobId, workerId },
      },
    });

    if (existing) {
      throw new ConflictException(
        existing.status === 'INVITED'
          ? 'This worker has already been invited.'
          : 'This worker has already applied or been processed.',
      );
    }

    // 4. Create JobApplication with INVITED status
    return this.prisma.jobApplication.create({
      data: {
        jobId,
        workerId,
        status: 'INVITED',
      },
      include: {
        worker: {
          include: {
            user: { select: { name: true, email: true } },
          },
        },
      },
    });
  }

  // ── Get all invites sent for a job (owner only) ──────────
  async getInvitesForJob(jobId: string, ownerId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) throw new NotFoundException('Job not found.');

    if (job.postedById !== ownerId) {
      throw new ForbiddenException('Only the job owner can view invites.');
    }

    return this.prisma.jobApplication.findMany({
      where: {
        jobId,
        status: 'INVITED',
      },
      include: {
        worker: {
          include: {
            user: { select: { name: true, email: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ── Get all invites received by the logged-in worker ─────
  async getMyInvites(userId: string) {
    const workerProfile = await this.prisma.workerProfile.findUnique({
      where: { userId },
    });

    if (!workerProfile) return [];

    return this.prisma.jobApplication.findMany({
      where: {
        workerId: workerProfile.id,
        status:   'INVITED',
      },
      include: {
        job: {
          include: {
            company:  { select: { name: true, logo: true } },
            postedBy: { select: { name: true, email: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ── Worker responds to an invite ─────────────────────────
  async respondToInvite(
    inviteId: string,
    response: 'ACCEPTED' | 'REJECTED',
    userId: string,
  ) {
    const workerProfile = await this.prisma.workerProfile.findUnique({
      where: { userId },
    });

    if (!workerProfile) {
      throw new NotFoundException('Worker profile not found.');
    }

    const record = await this.prisma.jobApplication.findUnique({
      where: { id: inviteId },
    });

    if (!record) throw new NotFoundException('Invite not found.');

    if (record.workerId !== workerProfile.id) {
      throw new ForbiddenException('You cannot respond to this invite.');
    }

    if (record.status !== 'INVITED') {
      throw new ConflictException(
        'This invite has already been responded to.',
      );
    }

    return this.prisma.jobApplication.update({
      where: { id: inviteId },
      data:  { status: response },
    });
  }
}