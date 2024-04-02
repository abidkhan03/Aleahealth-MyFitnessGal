import { UserEntity } from "../../user/entities/user.entity";
import { WorkoutEntity } from "../../workouts/entities/workout.entity";
import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'workoutplan'
})
export class WorkoutPlanEntity {
    @CreateDateColumn()
    @Exclude()
    createdAt: Date;

    @PrimaryGeneratedColumn()
    workoutPlanId: number;

    @Column({ length: 255 })
    title: string;

    @Column({ length: 255 })
    description: string;

    @ManyToOne(() => UserEntity, user => user.workoutPlans)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @OneToMany(() => WorkoutEntity, workout => workout.workoutPlan)
    workouts: WorkoutEntity[];
}
