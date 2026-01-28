import { IsString } from 'class-validator'

export class InviteWorkerDto {
    @IsString()
    workerProfileId: string;
}
