import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Req, Res } from '@nestjs/common';
import { MealplaneService } from './mealplane.service';
import { CreateMealplaneDto } from './dto/create-mealplane.dto';
import { UpdateMealplaneDto } from './dto/update-mealplane.dto';
import { MealPlanEntity } from './entities/mealplane.entity';

@Controller('mealplane')
export class MealplaneController {
  constructor(private readonly mealplaneService: MealplaneService) { }


  @Get('/meal')
  @Render('/meal-plan')
  async mealPlan() {
    return {}
  }
  @Post('/create')
  async createMealPlan(@Body() body: any, @Req() req: any, @Res() res: any) {
    if (!req.session.user) {
      return res.redirect('/auth/login');
    }
    const userId = req.session.user.id
    console.log('User ID: ', userId);
    try {
      const mealPlan = new MealPlanEntity();
      mealPlan.setName(body.name);
      mealPlan.setTotalCalories(body.totalCalories);
      mealPlan.setUser(body.user);
      console.log('User: ', body.user);
      mealPlan.setMeals(body.meals);
      await this.mealplaneService.createMealPlan(mealPlan, userId);
      return res.redirect('/');
    } catch (error) {
      console.log(error);
      res.session.flashErrors = [error.response.message];
      return res.redirect('/meal');
    }
  }

  @Get()
  findAll() {
    return this.mealplaneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealplaneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealplaneDto: UpdateMealplaneDto) {
    return this.mealplaneService.update(+id, updateMealplaneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealplaneService.remove(+id);
  }
}
