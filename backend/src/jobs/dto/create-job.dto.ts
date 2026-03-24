import {
  IsString,
  IsArray,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsUUID,
  IsEnum,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { JobStatus } from '../../generated/prisma/client.js';

export class CreateJobDto {

  // ── Required fields ───────────────────────────────────────

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  // Every job must belong to a company owned by the posting user
  // Validated as UUID — service verifies ownership separately
  @IsUUID()
  companyId: string;

  // ── Optional fields ───────────────────────────────────────

  // Skills default to [] in the service if not provided
  // Made optional here so the frontend can submit without skills
  // and the service will store an empty array
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  // Active defaults to true in the service if not provided
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  // Status defaults to ACTIVE in the service if not provided
  // Allows creating a job as DRAFT before publishing
  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;

  // Coordinates are optional — not all jobs have a physical location
  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lng?: number;
}