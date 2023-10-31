import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("artists")
export class Artist extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    name!: string
    @Column()
    email!: string
    @Column()
    style!: string
    @Column()
    password!: string
    @Column()
    role!: string
    @Column()
    created_at!: Date
    @Column()
    updated_at!: Date
}
