import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

}