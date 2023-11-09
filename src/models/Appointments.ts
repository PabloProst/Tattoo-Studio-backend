import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Artist } from "./Artists"

@Entity("appointments")
export class Appointment extends BaseEntity{

   @PrimaryGeneratedColumn()
  id!: number

  @Column()
  date!:string

  @Column()
  time!:string
  
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
  
  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date;
  
  @ManyToOne(() => User, (user)=>user.appointments)
  @JoinColumn({ name: "user_id" }) 
  user!:User
  
  @ManyToOne(() => Artist, (artist)=>artist.appointments)
  @JoinColumn({ name: "artist_id" }) 
  artist!:Artist
  
}