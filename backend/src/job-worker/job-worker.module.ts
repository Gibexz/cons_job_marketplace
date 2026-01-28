import { Module } from '@nestjs/common';
import { JobWorkerController } from './job-worker.controller.js';
import { JobWorkerService } from './job-worker.service.js';

@Module({
  controllers: [JobWorkerController],
  providers: [JobWorkerService]
})
export class JobWorkerModule {}
