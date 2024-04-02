import { Injectable } from '@nestjs/common';
import { CreateGoalmanagementDto } from './dto/create-goalmanagement.dto';
import { UpdateGoalmanagementDto } from './dto/update-goalmanagement.dto';

@Injectable()
export class GoalmanagementService {
  create(createGoalmanagementDto: CreateGoalmanagementDto) {
    return 'This action adds a new goalmanagement';
  }

  findAll() {
    return `This action returns all goalmanagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} goalmanagement`;
  }

  update(id: number, updateGoalmanagementDto: UpdateGoalmanagementDto) {
    return `This action updates a #${id} goalmanagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} goalmanagement`;
  }
}
