import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkoutplanDto } from './create-workoutplan.dto';

export class UpdateWorkoutplanDto extends PartialType(CreateWorkoutplanDto) {}
