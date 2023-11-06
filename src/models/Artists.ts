// Artist.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Appointment } from "./Appointments";
import { Gallery } from "./Gallery";

@Entity("artists")
export class Artist extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column()
    style!: string

    @Column()
    role!: string

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date

    @OneToMany(() => Appointment, appointment => appointment.artist)
    appointments!: Appointment[];    

    @OneToMany(() => Gallery, gallery => gallery.artist)
    gallery!: Gallery[];
}
