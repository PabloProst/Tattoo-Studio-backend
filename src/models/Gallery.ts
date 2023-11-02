import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Artist } from "./Artists"; // Asegúrate de importar la entidad Artist

@Entity("gallery")
export class Gallery extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    tattoo!: string
    @Column()
    artist_id!: number

    @ManyToOne(() => Artist, artist => artist.id) // Corregido para reflejar la relación entre Gallery y Artist
    @JoinColumn({ name: "artist_id" }) 
    artist!: Artist; 
}
