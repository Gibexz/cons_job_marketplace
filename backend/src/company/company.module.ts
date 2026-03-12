import { Module } from '@nestjs/common';
import { CompanyService } from './company.service.js';
import { CompanyController } from './company.controller.js';

@Module({
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
