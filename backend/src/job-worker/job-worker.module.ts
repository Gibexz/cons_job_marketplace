import { Module } from '@nestjs/common';
import { JobWorkerController } from './job-worker.controller.js';
import { JobWorkerService } from './job-worker.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [JobWorkerController],
  providers: [JobWorkerService]
})
export class JobWorkerModule {}
