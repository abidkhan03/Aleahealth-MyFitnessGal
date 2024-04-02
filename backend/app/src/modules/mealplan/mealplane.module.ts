import { Module } from '@nestjs/common';
import { MealplaneService } from './mealplane.service';
import { MealplaneController } from './mealplane.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealPlanEntity } from './entities/mealplane.entity';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [MealplaneController],
  providers: [MealplaneService],
  imports: [TypeOrmModule.forFeature([MealPlanEntity]), UserModule],
  exports: [MealplaneService]
})
export class MealplaneModule {}
