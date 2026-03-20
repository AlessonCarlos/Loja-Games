import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false})
    nome: string;

    @IsEmail() // valida se o formato é de email
    @IsNotEmpty()
    @Column({ length: 255, nullable: false, unique: true}) // Unique impede e-mails repetidos
    usuario: string;

    @MinLength(8) //Minimo 8 caracteres
    @IsNotEmpty()
    @Column({ length: 255, nullable:false})
    senha: string
    
    

}