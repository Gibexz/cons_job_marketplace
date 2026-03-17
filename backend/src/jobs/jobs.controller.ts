// import {
//   Controller,
//   Post,
//   Body,
//   UseGuards,
//   Req,
//   Get,
//   Param,
//   NotFoundException,
//   Delete,
//   HttpCode,
//   HttpStatus,
// } from '@nestjs/common';
// import { JobsService } from './jobs.service.js';
// import { CreateJobDto } from './dto/create-job.dto.js';
// import { JwtAuthGuard } from '../auth/jwt.guard.js';

// @Controller('jobs')
// export class JobsController {
//   constructor(private jobsService: JobsService) {}

//   // Endpoint to create a new job
//   @UseGuards(JwtAuthGuard)
//   @Post()
//   createJob(@Body() dto: CreateJobDto, @Req() req) {
//     return this.jobsService.createJob(dto, req.user.sub);
//   }

//   // New endpoint to get jobs for the authenticated user
//   @UseGuards(JwtAuthGuard)
//   @Get('my')
//   getMyJobs(@Req() req) {
//     return this.jobsService.getJobsByUser(req.user.sub);
//   }

//   // Endpoint to get job details by ID for authenticated users
//   @UseGuards(JwtAuthGuard)
//   @Get(':id')
//   async getJobById(@Param('id') id: string) {
//     const job = await this.jobsService.getJobById(id);
//     if (!job) {
//       throw new NotFoundException('Job not found');
//     }
//     return job;
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get('map')
//   getJobsForMap() {
//     return this.jobsService.getJobsForMap();
//   }
  
  
//   @UseGuards(JwtAuthGuard)
//   @Delete(':id')
//   @HttpCode(HttpStatus.NO_CONTENT)
//   deleteJob(@Param('id') id: string, @Req() req) {
//   // API: DELETE /jobs/:id
//   // Passes userId so the service can verify ownership before deleting
//   return this.jobsService.deleteJob(id, req.user.sub);
// }
// }


import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  NotFoundException,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JobsService } from './jobs.service.js';
import { CreateJobDto } from './dto/create-job.dto.js';
import { JwtAuthGuard } from '../auth/jwt.guard.js';

@Controller('jobs')
@UseGuards(JwtAuthGuard) // ← applies to all routes
export class JobsController {
  constructor(private jobsService: JobsService) {}

  // POST /jobs — create a job
  @Post()
  createJob(@Body() dto: CreateJobDto, @Req() req) {
    return this.jobsService.createJob(dto, req.user.sub);
  }

  // GET /jobs/my — jobs posted by this user
  @Get('my')
  getMyJobs(@Req() req) {
    return this.jobsService.getJobsByUser(req.user.sub);
  }

  // GET /jobs/map — active jobs with coordinates
  @Get('map')
  getJobsForMap() {
    return this.jobsService.getJobsForMap();
  }

  // GET /jobs/:id — single job detail
  @Get(':id')
  async getJobById(@Param('id') id: string) {
    const job = await this.jobsService.getJobById(id);
    if (!job) throw new NotFoundException('Job not found.');
    return job;
  }

  // DELETE /jobs/:id — delete owned job
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteJob(@Param('id') id: string, @Req() req) {
    return this.jobsService.deleteJob(id, req.user.sub);
  }
}