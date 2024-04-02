import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from '../common/common.module';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { AccountabilityModule } from '../accountability/accountability.module';
import { GoalmanagementModule } from '../goalmanagement/goalmanagement.module';
import { MealModule } from '../meal/meal.module';
import { MealplaneModule } from '../mealplan/mealplane.module';
import { TrackingModule } from '../tracking/tracking.module';
import { WorkoutplansModule } from '../workoutplans/workoutplans.module';
import { WorkoutsModule } from '../workouts/workouts.module';
import { CheckInEntity } from '../accountability/entities/accountability.entity';
import { GoalManagementEntity } from '../goalmanagement/entities/goalmanagement.entity';
import { MealEntity } from '../meal/entities/meal.entity';
import { MealPlanEntity } from '../mealplan/entities/mealplane.entity';
import { WorkoutPlanEntity } from '../workoutplans/entities/workoutplan.entity';
import { WorkoutEntity } from '../workouts/entities/workout.entity';
import { IntakeTrackingEntity } from '../tracking/entities/intake.tracking.entity';
import { WeightTrackingEntity } from '../tracking/entities/weight.tracking.entity';
import { ActivityTrackingEntity } from '../tracking/entities/activity.tracking.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MealService } from '../meal/meal.service';

console.log('Resolved Path: ', join(__dirname, '..', '..', '..', 'public'));
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [
            UserEntity,
            CheckInEntity,
            GoalManagementEntity,
            MealEntity,
            MealPlanEntity,
            WorkoutPlanEntity,
            WorkoutEntity,
            IntakeTrackingEntity,
            WeightTrackingEntity,
            ActivityTrackingEntity
          ],
          synchronize: configService.get('DB_SYNC') === 'true',
          keepConnectionAlive: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    CommonModule,
    UserModule,
    AccountabilityModule,
    GoalmanagementModule,
    MealModule,
    MealplaneModule,
    TrackingModule,
    WorkoutplansModule,
    WorkoutsModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
