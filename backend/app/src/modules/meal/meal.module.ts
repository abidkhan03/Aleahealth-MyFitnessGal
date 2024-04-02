import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { MealEntity } from './entities/meal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MealController],
  providers: [MealService],
  imports: [
    TypeOrmModule.forFeature([MealEntity])
  ],
  exports: [MealService]
})
export class MealModule {}
