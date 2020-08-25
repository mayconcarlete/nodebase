import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity({name:'users'})
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({nullable:false, length:50})
    name: string;

    @Column({nullable:false, length:50})
    email: string;

    @Column({nullable:false})
    password: string;

    @CreateDateColumn({name:'created_At'})
    createdAt:Date

    @UpdateDateColumn({name:'updated_At'})
    updatedAt:Date
}
