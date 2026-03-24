import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  // ── Apply for a job ──────────────────────────────────────
  // Creates a JobApplication record with status APPLIED
  // Throws if:
  //   - worker profile does not exist
  //   - job does not exist or is inactive
  //   - user owns the job
  //   - already applied or been processed
  async apply(jobId: string, userId: string, coverNote?: string) {

    // 1. Get the worker profile for this user
    const workerProfile = await this.prisma.workerProfile.findUnique({
      where: { userId },
    });

    if (!workerProfile) {
      throw new NotFoundException(
        'Worker profile not found. Please create a worker profile before applying.',
      );
    }

    // 2. Verify the job exists and is active
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundException('Job not found.');
    }

    if (!job.active) {
      throw new ForbiddenException(
        'This job is no longer accepting applications.',
      );
    }

    // 3. Prevent the job owner from applying to their own job
    if (job.postedById === userId) {
      throw new ForbiddenException('You cannot apply to your own job.');
    }

    // 4. Check for an existing JobApplication record
    const existing = await this.prisma.jobApplication.findUnique({
      where: {
        jobId_workerId: {
          jobId,
          workerId: workerProfile.id,
        },
      },
    });

    if (existing) {
      // If previously only INVITED, upgrade to APPLIED
      // This handles the case where owner invited them and they choose to apply
      if (existing.status === 'INVITED') {
        return this.prisma.jobApplication.update({
          where: { id: existing.id },
          data:  { status: 'APPLIED' },
          include: {
            job: {
              select: {
                title:    true,
                active:   true,
                postedBy: { select: { name: true, email: true } },
              },
            },
          },
        });
      }
      throw new ConflictException('You have already applied for this job.');
    }

    // 5. Create the JobApplication record with status APPLIED
    return this.prisma.jobApplication.create({
      data: {
        jobId,
        workerId: workerProfile.id,
        status:   'APPLIED',
      },
      include: {
        job: {
          select: {
            title:    true,
            active:   true,
            postedBy: { select: { name: true, email: true } },
          },
        },
      },
    });
  }

  // ── Check if a user has already applied ─────────────────
  // Returns { applied: boolean }
  // INVITED alone does not count as applied —
  // the user must have actively submitted an application
  async hasApplied(
    jobId: string,
    userId: string,
  ): Promise<{ applied: boolean }> {

    const workerProfile = await this.prisma.workerProfile.findUnique({
      where: { userId },
    });

    // No worker profile = definitely not applied
    if (!workerProfile) return { applied: false };

    const record = await this.prisma.jobApplication.findUnique({
      where: {
        jobId_workerId: {
          jobId,
          workerId: workerProfile.id,
        },
      },
    });

    return {
      applied: !!record && record.status !== 'INVITED',
    };
  }

  // ── Get all applications by the logged-in worker ─────────
  async getMyApplications(userId: string) {
    const workerProfile = await this.prisma.workerProfile.findUnique({
      where: { userId },
    });

    if (!workerProfile) return [];

    return this.prisma.jobApplication.findMany({
      where: {
        workerId: workerProfile.id,
        // Only return records where the worker actively applied
        // INVITED records are handled by the invites module
        status: { in: ['APPLIED', 'ACCEPTED', 'REJECTED', 'COMPLETED'] },
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

  // ── Get all applications for a job (job owner only) ──────
  async getApplicationsForJob(jobId: string, userId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) throw new NotFoundException('Job not found.');

    if (job.postedById !== userId) {
      throw new ForbiddenException(
        'You do not have permission to view applications for this job.',
      );
    }

    return this.prisma.jobApplication.findMany({
      where: {
        jobId,
        status: { in: ['APPLIED', 'ACCEPTED', 'REJECTED', 'COMPLETED'] },
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

  // ── Update application status (job owner only) ───────────
  async updateStatus(
    applicationId: string,
    status: 'ACCEPTED' | 'REJECTED' | 'COMPLETED',
    userId: string,
  ) {
    const record = await this.prisma.jobApplication.findUnique({
      where:   { id: applicationId },
      include: { job: true },
    });

    if (!record) throw new NotFoundException('Application not found.');

    if (record.job.postedById !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this application.',
      );
    }

    return this.prisma.jobApplication.update({
      where: { id: applicationId },
      data:  { status },
    });
  }

  // ── Withdraw an application (worker only) ────────────────
  async withdraw(applicationId: string, userId: string) {
    const workerProfile = await this.prisma.workerProfile.findUnique({
      where: { userId },
    });

    if (!workerProfile) {
      throw new NotFoundException('Worker profile not found.');
    }

    const record = await this.prisma.jobApplication.findUnique({
      where: { id: applicationId },
    });

    if (!record) throw new NotFoundException('Application not found.');

    if (record.workerId !== workerProfile.id) {
      throw new ForbiddenException('You cannot withdraw this application.');
    }

    return this.prisma.jobApplication.delete({
      where: { id: applicationId },
    });
  }
}