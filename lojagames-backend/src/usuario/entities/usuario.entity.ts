import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @ApiProperty()
    @Column({ length: 255, nullable: false})
    nome: string;

    @IsEmail() // valida se o formato é de email
    @IsNotEmpty()
    @ApiProperty({example: "email@email.com.br"})
    @Column({ length: 255, nullable: false, unique: true}) // Unique impede e-mails repetidos
    usuario: string;

    @MinLength(8) //Minimo 8 caracteres
    @IsNotEmpty()
    @ApiProperty() 
    @Column({ length: 255, nullable:false})
    senha: string
    
    

}