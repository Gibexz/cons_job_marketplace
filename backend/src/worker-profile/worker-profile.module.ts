import { Module } from '@nestjs/common';
import { WorkerProfileController } from './worker-profile.controller.js';
import { WorkerProfileService } from './worker-profile.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [WorkerProfileController],
  providers: [WorkerProfileService],
})
export class WorkerProfileModule {}
