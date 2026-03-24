import { Module }           from '@nestjs/common';
import { InvitesController } from './invites.controller.js';
import { InvitesService }    from './invites.service.js';
import { PrismaModule }      from '../prisma/prisma.module.js';

@Module({
  imports:     [PrismaModule],
  controllers: [InvitesController],
  providers:   [InvitesService],
  exports:     [InvitesService],
})
export class InvitesModule {}