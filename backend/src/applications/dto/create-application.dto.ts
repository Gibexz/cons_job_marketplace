import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateApplicationDto {
  @IsUUID()
  jobId: string;

  // Cover note is optional
  @IsOptional()
  @IsString()
  coverNote?: string;
}