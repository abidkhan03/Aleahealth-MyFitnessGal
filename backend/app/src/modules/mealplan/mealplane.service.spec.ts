import { Test, TestingModule } from '@nestjs/testing';
import { MealplaneService } from './mealplane.service';

describe('MealplaneService', () => {
  let service: MealplaneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealplaneService],
    }).compile();

    service = module.get<MealplaneService>(MealplaneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
