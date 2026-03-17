import { IsString, IsOptional, IsUrl, MaxLength } from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @IsUrl()
  logo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;
}