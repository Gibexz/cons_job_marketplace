import { Test, TestingModule } from '@nestjs/testing';
import { JobWorkerController } from './job-worker.controller.js';

describe('JobWorkerController', () => {
  let controller: JobWorkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobWorkerController],
    }).compile();

    controller = module.get<JobWorkerController>(JobWorkerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
