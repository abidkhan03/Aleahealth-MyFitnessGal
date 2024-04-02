import { UserEntity } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'check_in'
})
export class CheckInEntity {
    @PrimaryGeneratedColumn()
    checkinId: number;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ length: 255 })
    note: string;

    @OneToMany(() => UserEntity, user => user.checkIns)
    users: UserEntity;

    @ManyToOne(() => UserEntity, user => user.checkIns)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;
}
