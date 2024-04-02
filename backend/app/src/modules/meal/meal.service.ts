import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MealEntity } from './entities/meal.entity';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(MealEntity)
    private readonly mealRepository: Repository<MealEntity>,
  ) { }
  addMeal(addMeal: CreateMealDto) {
    return this.mealRepository.save(
      this.mealRepository.create(addMeal),
    );
  }

  async findAll(searchTerm?: string): Promise<MealEntity[]> {
    if (searchTerm) {
      return await this.mealRepository.find({
        where: { name: Like(`%${searchTerm}%`) },
        take: 10,
        order: { mealId: 'DESC' }, // Assuming there's a createdAt column
      });
    } else {
      return await this.mealRepository.find({
        take: 10,
        order: { mealId: 'DESC' }, // Modify as per your timestamp column
      });
    }
  }
  
  

  findOne(mealId: number) {
    if (isNaN(mealId)) {
      throw new Error('Invalid meal ID');
    }
    return this.mealRepository.findOne({
      where: { mealId },
    });
  }

  update(id: number, updateMealDto: UpdateMealDto) {
    return `This action updates a #${id} meal`;
  }

  remove(id: number) {
    return `This action removes a #${id} meal`;
  }
}
