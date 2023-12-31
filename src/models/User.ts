// User.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, Unique } from "typeorm";
import { Appointment } from "./Appointments";

@Entity("users")
@Unique(["email"])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date

    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments!: Appointment[];

}
