import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutplansController } from './workoutplans.controller';
import { WorkoutplansService } from './workoutplans.service';

describe('WorkoutplansController', () => {
  let controller: WorkoutplansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutplansController],
      providers: [WorkoutplansService],
    }).compile();

    controller = module.get<WorkoutplansController>(WorkoutplansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
