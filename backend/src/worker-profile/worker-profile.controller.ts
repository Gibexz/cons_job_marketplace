import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { WorkerProfileService } from './worker-profile.service.js';
import { JwtAuthGuard } from '../auth/jwt.guard.js';
import { CreateWorkerProfileDto } from './dto/create-worker-profile.dto.js';
import { UpdateWorkerProfileDto } from './dto/update-worker-profile.dto.js';

@Controller('worker-profile')
@UseGuards(JwtAuthGuard)
export class WorkerProfileController {
  constructor(private service: WorkerProfileService) {}

  @Post('create')
  create(@Req() req, @Body() dto: CreateWorkerProfileDto) {
    return this.service.create(req.user.sub, dto);
  }

  @Get('me')
  getMyProfile(@Req() req) {
    return this.service.getMyProfile(req.user.sub);
  }

  @Patch('update')
  update(@Req() req, @Body() dto: UpdateWorkerProfileDto) {
    return this.service.update(req.user.sub, dto);
  }

  @Get('available')
  getAvailableWorkers() {
    return this.service.getAllAvailableWorkers();
  }

  //view workers for map
  @Get('map')
  getWorkersForMap() {
    return this.service.getWorkersForMap();
  }

  // ⚠️ Must be BEFORE any :id param route
  // GET /worker-profile/match?skills=builder,mason,bricklayer
  @Get('match')
  @UseGuards(JwtAuthGuard)
  matchBySkills(@Query('skills') skills: string) {
    const skillsArray = skills ? skills.split(',').map((s) => s.trim()) : [];
    return this.service.matchBySkills(skillsArray);
  }
}
