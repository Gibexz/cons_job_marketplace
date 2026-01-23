import { Test, TestingModule } from '@nestjs/testing';
import { WorkerProfileController } from './worker-profile.controller';

describe('WorkerProfileController', () => {
  let controller: WorkerProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkerProfileController],
    }).compile();

    controller = module.get<WorkerProfileController>(WorkerProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
