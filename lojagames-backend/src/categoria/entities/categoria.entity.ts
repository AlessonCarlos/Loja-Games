import { IsNotEmpty } from "class-validator";
import { Produto } from "src/produto/etities/produto.entity";
import { Column, Entity, ManyToMany,PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "tb_categorias" })
export class Categoria {
    @PrimaryGeneratedColumn()    
    id: number;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    descricao: string;

    // Relacionamento: Uma Categoria para Muitos Produtos
    @ManyToMany(() => Produto, (produto) => produto.categoria)
    produto: Produto[];
}