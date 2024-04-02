import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutplansService } from './workoutplans.service';

describe('WorkoutplansService', () => {
  let service: WorkoutplansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutplansService],
    }).compile();

    service = module.get<WorkoutplansService>(WorkoutplansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
