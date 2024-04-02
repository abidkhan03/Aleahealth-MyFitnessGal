import { Module } from '@nestjs/common';
import { GoalmanagementService } from './goalmanagement.service';
import { GoalmanagementController } from './goalmanagement.controller';

@Module({
  controllers: [GoalmanagementController],
  providers: [GoalmanagementService],
})
export class GoalmanagementModule {}
