import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoalmanagementService } from './goalmanagement.service';
import { CreateGoalmanagementDto } from './dto/create-goalmanagement.dto';
import { UpdateGoalmanagementDto } from './dto/update-goalmanagement.dto';

@Controller('goalmanagement')
export class GoalmanagementController {
  constructor(private readonly goalmanagementService: GoalmanagementService) {}

  @Post()
  create(@Body() createGoalmanagementDto: CreateGoalmanagementDto) {
    return this.goalmanagementService.create(createGoalmanagementDto);
  }

  @Get()
  findAll() {
    return this.goalmanagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalmanagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoalmanagementDto: UpdateGoalmanagementDto) {
    return this.goalmanagementService.update(+id, updateGoalmanagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalmanagementService.remove(+id);
  }
}
