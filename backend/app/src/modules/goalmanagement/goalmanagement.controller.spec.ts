import { Test, TestingModule } from '@nestjs/testing';
import { GoalmanagementController } from './goalmanagement.controller';
import { GoalmanagementService } from './goalmanagement.service';

describe('GoalmanagementController', () => {
  let controller: GoalmanagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoalmanagementController],
      providers: [GoalmanagementService],
    }).compile();

    controller = module.get<GoalmanagementController>(GoalmanagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
