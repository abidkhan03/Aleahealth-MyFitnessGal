import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  import { Exclude } from 'class-transformer';
  
  import { PasswordTransformer } from '../../common/transformer/password-transformer';
import { WorkoutPlanEntity } from '../../workoutplans/entities/workoutplan.entity';
import { GoalManagementEntity } from '../../goalmanagement/entities/goalmanagement.entity';
import { CheckInEntity } from '../../accountability/entities/accountability.entity';
import { ActivityTrackingEntity } from '../../tracking/entities/activity.tracking.entity';
import { IntakeTrackingEntity } from '../../tracking/entities/intake.tracking.entity';
import { WeightTrackingEntity } from '../../tracking/entities/weight.tracking.entity';
import { MealPlanEntity } from '../../mealplan/entities/mealplane.entity';
  
  @Entity({
    name: 'users',
  })
  export class UserEntity {
    @CreateDateColumn()
    @Exclude()
    createdAt: Date;
  
    @UpdateDateColumn()
    @Exclude()
    updatedAt: Date;
  
    @PrimaryGeneratedColumn()
    userId: number;
  
    @Column({ length: 255 })
    fullName: string;

    @Column({ unique: true })
    email: string;
  
    @Column({
      name: 'password',
      length: 255,
      transformer: new PasswordTransformer(),
    })
    @Exclude()
    password: string;

    @OneToMany(() => WorkoutPlanEntity, workoutPlan => workoutPlan.user)
    workoutPlans: WorkoutPlanEntity[];

    @OneToMany(() => MealPlanEntity, mealPlan => mealPlan.user)
    mealPlans: MealPlanEntity[];

    @OneToMany(() => GoalManagementEntity, goal => goal.user)
    goals: GoalManagementEntity[];

    @OneToMany(() => CheckInEntity, checkIn => checkIn.users)
    checkIns: CheckInEntity[];

    @OneToMany(() => ActivityTrackingEntity, activityEntity => activityEntity.user)
    activities: ActivityTrackingEntity[];

    @OneToMany(() => IntakeTrackingEntity, intakeActivity => intakeActivity.user)
    intakeActivities: IntakeTrackingEntity[];

    @OneToMany(() => WeightTrackingEntity, weightActivity => weightActivity.user)
    weightActivities: WeightTrackingEntity[];

    getId(): number {
      return this.userId;
    }

    getName(): string {
      return this.fullName;
    }

    setMealPlans(mealPlans: MealPlanEntity[]) {
      this.mealPlans = mealPlans;
    }

    getMealPlans(): MealPlanEntity[] {
      return this.mealPlans;
    }

    setWorkoutPlans(workoutPlans: WorkoutPlanEntity[]) {
      this.workoutPlans = workoutPlans;
    }

    getWorkoutPlans(): WorkoutPlanEntity[] {
      return this.workoutPlans;
    }

    setGoals(goals: GoalManagementEntity[]) {
      this.goals = goals;
    }

    getGoals(): GoalManagementEntity[] {
      return this.goals;
    }

    setCheckIns(checkIns: CheckInEntity[]) {
      this.checkIns = checkIns;
    }

    getCheckIns(): CheckInEntity[] {
      return this.checkIns;
    }
    
  }