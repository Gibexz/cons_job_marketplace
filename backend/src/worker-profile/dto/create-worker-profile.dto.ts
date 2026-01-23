import { IsArray, IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";

import { ExperienceLevel } from '../../generated/prisma/enums.js';

export class CreateWorkerProfileDto {
    @IsArray()
    skills: string[];

    @IsEnum(ExperienceLevel)
    experience: ExperienceLevel;

    @IsBoolean()
    available: boolean;

    @IsOptional()
    @IsString()
    bio: string;
}