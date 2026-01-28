import { IsEnum } from "class-validator";
import { JobWorkerStatus } from "../../generated/prisma/client.js";


export class RespondInviteDto {
    @IsEnum(JobWorkerStatus)
    status: JobWorkerStatus; // e.g., ACCEPTED or REJECTED
}