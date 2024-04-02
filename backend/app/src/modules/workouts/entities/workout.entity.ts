import { WorkoutPlanEntity } from "../../workoutplans/entities/workoutplan.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'workout'
})
export class WorkoutEntity {    
    @PrimaryGeneratedColumn()
    workoutId: number;

    @Column({ length: 255 })
    exerciseName: string;

    @Column({ length: 255 })
    type: string;

    @Column({ length: 255 })
    duration: string;

    @Column({ length: 255 })
    intensity: string;

    @ManyToOne(() => WorkoutPlanEntity, workoutPlan => workoutPlan.workouts)
    @JoinColumn({ name: 'workoutPlanId' })
    workoutPlan: WorkoutPlanEntity;
}
