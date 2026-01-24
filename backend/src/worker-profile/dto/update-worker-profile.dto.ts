import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkerProfileDto } from './create-worker-profile.dto.js';

export class UpdateWorkerProfileDto extends PartialType(
  CreateWorkerProfileDto,
) {}
