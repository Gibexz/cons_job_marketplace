import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  ArrayNotEmpty,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { ExperienceLevel } from '../../generated/prisma/client.js';

export class CreateWorkerProfileDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  skills: string[];

  @IsEnum(ExperienceLevel)
  experience: ExperienceLevel;

  @IsBoolean()
  available: boolean;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsNumber()
  @IsLatitude()
  lat?: number;

  @IsOptional()
  @IsNumber()
  @IsLongitude()
  lng?: number;
}