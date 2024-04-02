import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { MealEntity } from "../entities/meal.entity";

export class CreateMealDto extends MealEntity {
    @ApiProperty({
        required: true
    })
    @IsString()
    name: string;

    mealType: string;

    @IsString()
    calories: string;

    @IsOptional()
    @IsString()
    protein: string;

    @IsOptional()
    @IsString()
    carbs: string;

    @IsOptional()
    @IsString()
    fat: string;

    @IsOptional()
    @IsString()
    servingSize: string;

    setId(id: number) {
        this.mealId = id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    getMealType(): string {
        return this.mealType;
    }

    setMealType(mealType: string) {
        this.mealType = mealType;
    }

    getCalories(): string {
        return this.calories;
    }

    setCalories(calories: string) {
        this.calories = calories;
    }

    getProtein(): string {
        return this.protein;
    }

    setProtein(protein: string) {
        this.protein = protein;
    }

    getCarbs(): string {
        return this.carbs;
    }

    setCarbs(carbs: string) {
        this.carbs = carbs;
    }

    getFat(): string {
        return this.fat;
    }

    setFat(fat: string) {
        this.fat = fat;
    }

    getServingSize(): string {
        return this.servingSize;
    }

    setServingSize(servingSize: string) {
        this.servingSize = servingSize;
    }
}
