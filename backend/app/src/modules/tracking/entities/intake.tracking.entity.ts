import { UserEntity } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'intakeTracking'
})
export class IntakeTrackingEntity {
    @PrimaryGeneratedColumn()
    intakeId: number;

    @Column({ length: 255 })
    type: string;

    @Column()
    quantity: number;

    @Column({ length: 255 })
    calories: string;

    @Column({ type: 'timestamp'})
    date: Date;

    @ManyToOne(() => UserEntity, user => user.intakeActivities)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;
}