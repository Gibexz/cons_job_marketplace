// import {
//   IsString,
//   IsOptional,
//   IsNumber,
//   IsBoolean,
//   IsArray,
// } from 'class-validator';

// export class CreateJobDto {
//   @IsString()
//   title: string;

//   @IsString()
//   description: string;

//   @IsOptional()
//   @IsString()
//   company?: string;

//   @IsOptional()
//   @IsNumber()
//   lat?: number;

//   @IsOptional()
//   @IsNumber()
//   lng?: number;

//   @IsOptional()
//   @IsArray()
//   @IsString({ each: true }) // validates every item in the array is a string
//   skills?: string[];

//   @IsOptional()
//   @IsBoolean()
//   active?: boolean;
// }

import {
  IsString,
  IsArray,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsUUID,
  MinLength,
  MaxLength,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateJobDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsUUID()
  companyId: string; // ← now a validated UUID, not a plain string

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  skills: string[];

  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lng?: number;
}