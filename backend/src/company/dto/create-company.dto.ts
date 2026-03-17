import {
  IsString,
  IsOptional,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  logo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;
}