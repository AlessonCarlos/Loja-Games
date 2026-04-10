import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Produto } from "src/produto/entities/produto.entity";
import { Column, Entity, ManyToMany,PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "tb_categorias" })
export class Categoria {
    @PrimaryGeneratedColumn()
    @ApiProperty()       
    id: number;

    @IsNotEmpty()
    @ApiProperty()
    @Column({ length: 255, nullable: false })
    descricao: string;

    // Relacionamento: Uma Categoria para Muitos Produtos
    @ApiProperty() 
    @ManyToMany(() => Produto, (produto) => produto.categoria)
    produto: Produto[];
}