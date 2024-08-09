﻿import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({name:'tb_produtos'})
export class Produto {

    @PrimaryGeneratedColumn()
    id:number;

    @IsNotEmpty()
    @Column({length:255,nullable:false})
    nome:string;

    @Column({length:5000})
    descricao:string;

    @IsNumber({maxDecimalPlaces:2})
    @Column({ type: "decimal", precision: 10, scale: 2 , nullable: false})
    preco:number;

    @Column({nullable:false})
    quantidade:number;

    @Column({length:5000})
    foto:string;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria; 
}