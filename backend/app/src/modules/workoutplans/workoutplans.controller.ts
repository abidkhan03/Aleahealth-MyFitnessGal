import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkoutplansService } from './workoutplans.service';
import { CreateWorkoutplanDto } from './dto/create-workoutplan.dto';
import { UpdateWorkoutplanDto } from './dto/update-workoutplan.dto';

@Controller('workoutplans')
export class WorkoutplansController {
  constructor(private readonly workoutplansService: WorkoutplansService) {}

  @Post()
  create(@Body() createWorkoutplanDto: CreateWorkoutplanDto) {
    return this.workoutplansService.create(createWorkoutplanDto);
  }

  @Get()
  findAll() {
    return this.workoutplansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutplansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutplanDto: UpdateWorkoutplanDto) {
    return this.workoutplansService.update(+id, updateWorkoutplanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutplansService.remove(+id);
  }
}
