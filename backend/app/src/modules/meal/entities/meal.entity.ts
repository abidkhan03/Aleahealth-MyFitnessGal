import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { MealPlanEntity } from "../../mealplan/entities/mealplane.entity";

@Entity('meals')
export class MealEntity {
  @PrimaryGeneratedColumn()
  mealId: number;

  @Column({ length: 255 })
  mealType: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  calories: string;

  @Column({ length: 255 })
  protein: string;

  @Column({ length: 255 })
  carbs: string;

  @Column({ length: 255 })
  fat: string;

  @Column({ length: 255 })
  servingSize: string;

  @ManyToOne(() => MealPlanEntity, mealPlan => mealPlan.meals)
  @JoinColumn({ name: 'mealPlanId' })
  mealPlan: MealPlanEntity;
}
