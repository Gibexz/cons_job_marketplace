import {
  Controller,
  Post,
  Patch,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Query,
  NotFoundException,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JobsService }  from './jobs.service.js';
import { CreateJobDto } from './dto/create-job.dto.js';
import { UpdateJobDto } from './dto/update-job.dto.js';
import { JwtAuthGuard } from '../auth/jwt.guard.js';
import { JobStatus }    from '../generated/prisma/client.js';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  // ── Static routes — must come before /:id ─────────────────

  // GET /jobs/all — public, all jobs all statuses
  @Get('all')
  getAllJobs() {
    return this.jobsService.getAllJobs();
  }

  // GET /jobs/active — public, only ACTIVE status jobs
  @Get('active')
  getAllActiveJobs() {
    return this.jobsService.getAllActiveJobs();
  }

  // GET /jobs/my?status=ACTIVE|CLOSED|COMPLETED|CANCELLED|DRAFT
  @UseGuards(JwtAuthGuard)
  @Get('my')
  getMyJobs(@Req() req, @Query('status') status?: JobStatus) {
    return this.jobsService.getJobsByUser(req.user.sub, status);
  }

  // GET /jobs/my/counts — tab badge counts per status
  @UseGuards(JwtAuthGuard)
  @Get('my/counts')
  getMyJobCounts(@Req() req) {
    return this.jobsService.getJobCountsByStatus(req.user.sub);
  }

  // GET /jobs/map
  @UseGuards(JwtAuthGuard)
  @Get('map')
  getJobsForMap() {
    return this.jobsService.getJobsForMap();
  }

  // ── Param routes ──────────────────────────────────────────

  // POST /jobs
  @UseGuards(JwtAuthGuard)
  @Post()
  createJob(@Body() dto: CreateJobDto, @Req() req) {
    return this.jobsService.createJob(dto, req.user.sub);
  }

  // GET /jobs/:id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getJobById(@Param('id') id: string) {
    const job = await this.jobsService.getJobById(id);
    if (!job) throw new NotFoundException('Job not found.');
    return job;
  }

  // PATCH /jobs/:id
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateJob(
    @Param('id') id: string,
    @Body() dto: UpdateJobDto,
    @Req() req,
  ) {
    return this.jobsService.updateJob(id, req.user.sub, dto);
  }

  // DELETE /jobs/:id
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteJob(@Param('id') id: string, @Req() req) {
    return this.jobsService.deleteJob(id, req.user.sub);
  }
}