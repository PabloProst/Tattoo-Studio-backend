import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Artist } from "./Artists";

@Entity("appointments")
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: string;

    @Column()
    artistId!: string;

    @Column()
    time!: string;

    @Column()
    created_at!: Date;

    @Column()
    updated_at!: Date;

    @ManyToOne(() => User, user => user.appointments)
    user!: User;

    @ManyToOne(() => Artist, artist => artist.appointments)
    artist!: Artist;
}
