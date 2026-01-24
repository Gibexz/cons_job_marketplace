import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JobsService } from './jobs.service.js';
import { CreateJobDto } from './dto/create-job.dto.js';
import { JwtAuthGuard } from '../auth/jwt.guard.js';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createJob(@Body() dto: CreateJobDto, @Req() req) {
    return this.jobsService.createJob(dto, req.user.sub);
  }
}
