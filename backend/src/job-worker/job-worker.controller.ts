import { 
    Controller, Post, Patch, Get, Param, 
    Body, Req, UseGuards 
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt.guard.js';
import { JobWorkerService  } from './job-worker.service.js';
import { InviteWorkerDto } from './dto/invite-worker.dto.js';
import { RespondInviteDto } from './dto/respond-invite.dto.js';

@Controller('job-worker')
@UseGuards(JwtAuthGuard)
export class JobWorkerController {
    constructor(private service: JobWorkerService) {}

    // Client invites worker
    @Post(':jobId/invite')
    invite(
        @Param('jobId') jobId: string,
        @Req() req,
        @Body() dto: InviteWorkerDto,
    ) {
        return this.service.inviteWorker(
            jobId,
            req.user.sub,
            dto.workerProfileId,
        );
    }

    // Worker accepts/rejects invite
    @Patch(':jobWorkerId/respond')
    respond(
        @Param('jobWorkerId') jobWorkerId: string,
        @Req() req,
        @Body() dto: RespondInviteDto,
    ){
        return this.service.respondToInvite(
            jobWorkerId,
            req.user.sub,
            dto.status,
        );
    }

    // View Job Team
    @Get('jobId/team')
    getTeam(
        @Param('jobId') jobId: string 
    ){
        return this.service.getJobTeam(jobId);
    }

}
