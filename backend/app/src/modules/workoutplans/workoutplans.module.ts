import { Module } from '@nestjs/common';
import { WorkoutplansService } from './workoutplans.service';
import { WorkoutplansController } from './workoutplans.controller';

@Module({
  controllers: [WorkoutplansController],
  providers: [WorkoutplansService],
})
export class WorkoutplansModule {}
