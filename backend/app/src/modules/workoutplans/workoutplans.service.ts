import { Injectable } from '@nestjs/common';
import { CreateWorkoutplanDto } from './dto/create-workoutplan.dto';
import { UpdateWorkoutplanDto } from './dto/update-workoutplan.dto';

@Injectable()
export class WorkoutplansService {
  create(createWorkoutplanDto: CreateWorkoutplanDto) {
    return 'This action adds a new workoutplan';
  }

  findAll() {
    return `This action returns all workoutplans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workoutplan`;
  }

  update(id: number, updateWorkoutplanDto: UpdateWorkoutplanDto) {
    return `This action updates a #${id} workoutplan`;
  }

  remove(id: number) {
    return `This action removes a #${id} workoutplan`;
  }
}
