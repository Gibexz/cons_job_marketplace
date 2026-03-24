import { Module }                 from '@nestjs/common';
import { ApplicationsController } from './applications.controller.js';
import { ApplicationsService }    from './applications.service.js';
import { PrismaModule }           from '../prisma/prisma.module.js';

@Module({
  imports:     [PrismaModule],
  controllers: [ApplicationsController],
  providers:   [ApplicationsService],
  exports:     [ApplicationsService],
})
export class ApplicationsModule {}