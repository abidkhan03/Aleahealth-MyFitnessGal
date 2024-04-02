import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Req, Res, Query } from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) { }

  @Get('/add')
  @Render('meal/food-items')
  async food(@Req() req: any, @Res() res: any) {
    if (!req.session.user) {
      return res.redirect('/auth/login');
    }
    return { active: 'food' }
  }
  @Post('/addMeal')
  async addMeal(@Body() body: any, @Req() req: any, @Res() res: any) {
    const newMeal = new CreateMealDto();
    newMeal.setName(body.name);
    newMeal.setMealType(body.mealType);
    console.log('Adding new meal with type:', body.mealType);
    newMeal.setCalories(body.calories);
    newMeal.setProtein(body.protein);
    newMeal.setCarbs(body.carbs);
    newMeal.setFat(body.fat);
    newMeal.setServingSize(body.servingSize);
    await this.mealService.addMeal(newMeal);
    return res.redirect('/meal/meal-plan');
  }

  @Get('/meal-plan')
  @Render('meal/meal-plan')
  async mealPlan() {
    return { active: 'plans' }
  }

  @Get('/all-meals')
  // @Render('meal/all-meals')
  async getAllMeals(@Res() res: any, @Query('search') search?: string) {
    const meals = await this.mealService.findAll(search);
    return res.render('meal/all-meals', { meals, search, active: 'meals' });
  }

  @Get('/:id')
  @Render('meal/update-food')
  async edit(@Param('id') id: number) {
    const meal = await this.mealService.findOne(+id);
    return { meal };
  }

  @Post('/:id/update')
  async update(@Body() Body: any, @Param('id') mealId: number, @Req() request: any, @Res() response: any) {
    try {
      const updateMeal = new UpdateMealDto();
      updateMeal.setName(Body.name);
      updateMeal.setCalories(Body.calories);
      updateMeal.setProtein(Body.protein);
      updateMeal.setCarbs(Body.carbs);
      updateMeal.setFat(Body.fat);
      updateMeal.setServingSize(Body.servingSize);
      await this.mealService.update(mealId, updateMeal);
      return response.redirect('/meal/all-meals');
    } catch (error) {
      request.session.flashErrors = [error.response.message];
      return response.redirect('/meal/all-meals');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealService.remove(+id);
  }
}
