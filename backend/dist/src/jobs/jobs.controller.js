var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { JobsService } from './jobs.service.js';
import { CreateJobDto } from './dto/create-job.dto.js';
import { JwtAuthGuard } from '../auth/jwt.guard.js';
let JobsController = class JobsController {
    jobsService;
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    createJob(dto, req) {
        return this.jobsService.createJob(dto, req.user.sub);
    }
    getMyJobs(req) {
        return this.jobsService.getJobsByUser(req.user.sub);
    }
};
__decorate([
    UseGuards(JwtAuthGuard),
    Post(),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateJobDto, Object]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "createJob", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Get('my'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "getMyJobs", null);
JobsController = __decorate([
    Controller('jobs'),
    __metadata("design:paramtypes", [JobsService])
], JobsController);
export { JobsController };
//# sourceMappingURL=jobs.controller.js.map