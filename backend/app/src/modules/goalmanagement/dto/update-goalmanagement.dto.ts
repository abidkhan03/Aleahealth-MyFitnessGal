import { PartialType } from '@nestjs/mapped-types';
import { CreateGoalmanagementDto } from './create-goalmanagement.dto';

export class UpdateGoalmanagementDto extends PartialType(CreateGoalmanagementDto) {}
