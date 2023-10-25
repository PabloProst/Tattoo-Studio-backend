import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("users")
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
}
