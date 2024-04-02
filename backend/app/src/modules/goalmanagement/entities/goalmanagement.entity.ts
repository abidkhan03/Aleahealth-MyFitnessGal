import { UserEntity } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'goal_management'
})
export class GoalManagementEntity {    
    @PrimaryGeneratedColumn()
    goalId: number;

    @Column({ length: 255 })
    type: string;

    @Column()
    target: number;

    @Column({ type: 'timestamp'})
    startDate: Date;

    @Column({ type: 'timestamp'})
    endDate: Date;

    @Column({ length: 255 })
    status: string;

    @ManyToOne(() => UserEntity, user => user.goals)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;
}
