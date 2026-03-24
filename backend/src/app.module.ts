import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { JobsModule } from './jobs/jobs.module.js';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { PrismaService } from './prisma/prisma.service.js';
import { WorkerProfileModule } from './worker-profile/worker-profile.module.js';
import { CompanyModule } from './company/company.module.js';
import { ApplicationsModule } from './applications/applications.module.js';
import { InvitesModule } from './invites/invites.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    JobsModule,
    PrismaModule,
    WorkerProfileModule,
    CompanyModule,
    ApplicationsModule,
    InvitesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
