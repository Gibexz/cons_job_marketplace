import { Test, TestingModule } from '@nestjs/testing';
import { JobWorkerService } from './job-worker.service.js';

describe('JobWorkerService', () => {
  let service: JobWorkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobWorkerService],
    }).compile();

    service = module.get<JobWorkerService>(JobWorkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
