import { UserEntity } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'weightTracking'
})
export class WeightTrackingEntity {
    @PrimaryGeneratedColumn()
    weightId: number;

    @Column({ length: 255 })
    weight: string;

    @Column({ type: 'timestamp'})
    dateLogged: Date;

    @ManyToOne(() => UserEntity, user => user.weightActivities)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;
}