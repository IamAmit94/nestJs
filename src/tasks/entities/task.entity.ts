import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'tasks'})
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    title: string

    @Column({type: 'text', nullable: true})
    description: string
}
