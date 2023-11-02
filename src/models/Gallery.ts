import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Artist } from "./Artists";

@Entity("gallery")
export class Gallery extends BaseEntity {

    @PrimaryGeneratedColumn()
    tattoo_id!: number

    @Column()
    description!: string

    @Column()
    image_url!: string

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date

    @ManyToOne(() => Artist, artist => artist.gallery)
    artist!: Artist
}
