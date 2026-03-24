import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InvitesService } from './invites.service.js';
import { JwtAuthGuard }   from '../auth/jwt.guard.js';

@Controller('invites')
@UseGuards(JwtAuthGuard)
export class InvitesController {
  constructor(private invitesService: InvitesService) {}

  // ── Static routes BEFORE param routes ────────────────────

  // GET /invites/my
  // Returns all invites received by the logged-in worker
  @Get('my')
  getMyInvites(@Req() req) {
    return this.invitesService.getMyInvites(req.user.sub);
  }

  // GET /invites/job/:jobId
  // Returns all invites sent for a specific job — owner only
  @Get('job/:jobId')
  getInvitesForJob(@Param('jobId') jobId: string, @Req() req) {
    return this.invitesService.getInvitesForJob(jobId, req.user.sub);
  }

  // ── Param routes ─────────────────────────────────────────

  // POST /invites
  // Job owner sends an invite to a worker
  // Body: { jobId: string, workerId: string }
  @Post()
  sendInvite(
    @Body('jobId')    jobId:    string,
    @Body('workerId') workerId: string,
    @Req() req,
  ) {
    return this.invitesService.sendInvite(jobId, workerId, req.user.sub);
  }

  // PATCH /invites/:id/respond
  // Worker accepts or rejects an invite
  // Body: { response: 'ACCEPTED' | 'REJECTED' }
  @Patch(':id/respond')
  respondToInvite(
    @Param('id') id: string,
    @Body('response') response: 'ACCEPTED' | 'REJECTED',
    @Req() req,
  ) {
    return this.invitesService.respondToInvite(id, response, req.user.sub);
  }
}