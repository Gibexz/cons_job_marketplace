import { Module } from '@nestjs/common';
import { WorkerProfileController } from './worker-profile.controller.js';
import { WorkerProfileService } from './worker-profile.service.js';

@Module({
  controllers: [WorkerProfileController],
  providers: [WorkerProfileService]
})
export class WorkerProfileModule {}
