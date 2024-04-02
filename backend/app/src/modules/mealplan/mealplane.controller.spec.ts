import { Test, TestingModule } from '@nestjs/testing';
import { MealplaneController } from './mealplane.controller';
import { MealplaneService } from './mealplane.service';

describe('MealplaneController', () => {
  let controller: MealplaneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealplaneController],
      providers: [MealplaneService],
    }).compile();

    controller = module.get<MealplaneController>(MealplaneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
