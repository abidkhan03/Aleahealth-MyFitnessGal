import { Test, TestingModule } from '@nestjs/testing';
import { GoalmanagementService } from './goalmanagement.service';

describe('GoalmanagementService', () => {
  let service: GoalmanagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoalmanagementService],
    }).compile();

    service = module.get<GoalmanagementService>(GoalmanagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
