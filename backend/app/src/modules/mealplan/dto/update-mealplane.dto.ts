import { PartialType } from '@nestjs/mapped-types';
import { CreateMealplaneDto } from './create-mealplane.dto';

export class UpdateMealplaneDto extends PartialType(CreateMealplaneDto) {}
