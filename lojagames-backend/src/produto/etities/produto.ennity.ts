import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_produtos'}) // Nome da tabela
export class Produto {

    @PrimaryGeneratedColumn() // chave primaria e auto-incrementada
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome: string;

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    descricao: string;

    @IsNumber({ maxDecimalPlaces: 2})
    @IsPositive()
    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
    preco: number;

    @Column({ length: 100})
    plataforma: string;

    @UpdateDateColumn()
    data: Date;


}