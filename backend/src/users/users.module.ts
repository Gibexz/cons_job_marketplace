import { Module }          from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService }    from './users.service.js';
import { PrismaModule }    from '../prisma/prisma.module.js';

@Module({
  imports:     [PrismaModule],
  controllers: [UsersController],
  providers:   [UsersService],
  exports:     [UsersService], // export so other modules can use it if needed
})
export class UsersModule {}