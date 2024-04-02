import { MealEntity } from "../../meal/entities/meal.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'mealPlan'
})
export class MealPlanEntity {
    @CreateDateColumn()
    @Exclude()
    createdAt: Date;

    @PrimaryGeneratedColumn()
    mealPlanId: number;

    @Column({ length: 255 })
    name: string;

    @Column()
    userId: number;

    @Column()
    totalCalories: number;

    @Column({ length: 255 })
    description: string;

    @OneToMany(() => MealEntity, meal => meal.mealPlan, {
        cascade: true,
    })
    meals: MealEntity[];

    @ManyToOne(() => UserEntity, user => user.mealPlans)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    setMealPlanId(id: number) {
        this.mealPlanId = id;
    }

    getMealPlanId(): number {
        return this.mealPlanId;
    }

    setName(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    setUser(user: UserEntity) {
        this.user = user;
    }

    getUser(): UserEntity {
        return this.user;
    }

    setTotalCalories(totalCalories: number) {
        this.totalCalories = totalCalories;
    }

    getTotalCalories(): number {
        return this.totalCalories;
    }

    setDescription(description: string) {
        this.description = description;
    }

    getDescription(): string {
        return this.description;
    }
    
    setMeals(meals: MealEntity[]) {
        this.meals = meals;
    }

    getMeals(): MealEntity[] {
        return this.meals;
    }


}
