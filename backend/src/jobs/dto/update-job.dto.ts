import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { JobStatus } from '../../generated/prisma/client.js';

export class UpdateJobDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  description?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lng?: number;
}