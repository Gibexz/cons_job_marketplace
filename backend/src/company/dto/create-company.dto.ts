import { IsString, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsOptional()
  logo?: string;

  @IsOptional()
  address?: string;
}
