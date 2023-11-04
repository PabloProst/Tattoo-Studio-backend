import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Artist } from "./Artists";

@Entity("gallery")
export class Gallery extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    tattoo!: string

    @Column()
    artist_id!: number

    @ManyToOne(() => Artist, artist => artist.gallery)
    @JoinColumn({ name: "id" }) 
    artist!: Artist;
}
