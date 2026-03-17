import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CompanyService } from './company.service.js';
import { JwtAuthGuard } from '../auth/jwt.guard.js';
import { CreateCompanyDto } from './dto/create-company.dto.js';
import { UpdateCompanyDto } from './dto/update-company.dto.js';

@Controller('company')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private service: CompanyService) {}

  // POST /company/create
  @Post('create')
  create(@Req() req, @Body() dto: CreateCompanyDto) {
    return this.service.create(req.user.sub, dto);
  }

  // GET /company/my-companies
  @Get('my-companies')
  getMyCompanies(@Req() req) {
    return this.service.getMyCompanies(req.user.sub);
  }

  // GET /company/:id
  @Get(':id')
  getOne(@Req() req, @Param('id') id: string) {
    return this.service.getOne(req.user.sub, id);
  }

  // PATCH /company/:id
  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
  ) {
    return this.service.update(req.user.sub, id, dto);
  }
}