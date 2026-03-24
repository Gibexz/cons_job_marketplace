import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApplicationsService }  from './applications.service.js';
import { CreateApplicationDto } from './dto/create-application.dto.js';
import { JwtAuthGuard }         from '../auth/jwt.guard.js';

@Controller('applications')
@UseGuards(JwtAuthGuard) // All routes require authentication
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  // ── Static routes BEFORE param routes ────────────────────

  // GET /applications/my
  // Returns all applications submitted by the logged-in worker
  @Get('my')
  getMyApplications(@Req() req) {
    return this.applicationsService.getMyApplications(req.user.sub);
  }

  // GET /applications/check/:jobId
  // Returns { applied: boolean } for the logged-in user + given job
  @Get('check/:jobId')
  checkApplication(@Param('jobId') jobId: string, @Req() req) {
    return this.applicationsService.hasApplied(jobId, req.user.sub);
  }

  // GET /applications/job/:jobId
  // Returns all applications for a job — job owner only
  @Get('job/:jobId')
  getApplicationsForJob(@Param('jobId') jobId: string, @Req() req) {
    return this.applicationsService.getApplicationsForJob(
      jobId,
      req.user.sub,
    );
  }

  // ── Param routes ─────────────────────────────────────────

  // POST /applications
  // Worker submits an application for a job
  @Post()
  apply(@Body() dto: CreateApplicationDto, @Req() req) {
    return this.applicationsService.apply(
      dto.jobId,
      req.user.sub,
      dto.coverNote,
    );
  }

  // PATCH /applications/:id/status
  // Job owner accepts, rejects, or marks an application complete
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'ACCEPTED' | 'REJECTED' | 'COMPLETED',
    @Req() req,
  ) {
    return this.applicationsService.updateStatus(id, status, req.user.sub);
  }

  // DELETE /applications/:id
  // Worker withdraws their own application
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  withdraw(@Param('id') id: string, @Req() req) {
    return this.applicationsService.withdraw(id, req.user.sub);
  }
}