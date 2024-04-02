import { UserEntity } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'activityTracking'
})
export class ActivityTrackingEntity {
    @PrimaryGeneratedColumn()
    activityId: number;

    @Column({ length: 255 })
    type: string;

    @Column()
    stepsCounted: number;

    @Column({ length: 255 })
    distance: string;

    @Column({ length: 255 })
    duration: string;

    @Column({ type: 'timestamp'})
    date: Date;

    @ManyToOne(() => UserEntity, user => user.activities)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;
}
