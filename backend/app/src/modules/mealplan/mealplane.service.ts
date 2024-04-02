import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMealplaneDto } from './dto/create-mealplane.dto';
import { UpdateMealplaneDto } from './dto/update-mealplane.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MealPlanEntity } from './entities/mealplane.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../user/user.service';

@Injectable()
export class MealplaneService {
  constructor(
    @InjectRepository(MealPlanEntity)
    private mealPlanRepository: Repository<MealPlanEntity>,
    private userService: UsersService,
  ) { }
  createMealPlan(mealPlanData: MealPlanEntity, userId: number) {
    const user = this.userService.get(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const mealPlan = this.mealPlanRepository.create({
      ...mealPlanData,
      userId,
    });
    return this.mealPlanRepository.save(mealPlan)
  }

  findAll() {
    return 'meal plan';
  }

  async findOne(id: number) {
    return 'get meal plan';
  }

  async update(id: number, updateMealPlanDto: UpdateMealplaneDto) {
    return 'update mealplan'
  }

  async remove(id: number) {
    return 'remove mealplan';
  }
}
