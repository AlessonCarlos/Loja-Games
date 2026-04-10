import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Column, Entity, JoinTable, ManyToMany,PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_produtos'}) // Nome da tabela
export class Produto {

    @ApiProperty()  
    @PrimaryGeneratedColumn() // chave primaria e auto-incrementada
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    descricao: string;

    @ApiProperty()
    @IsNumber({ maxDecimalPlaces: 2})
    @IsPositive()
    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
    preco: number;

    @ApiProperty()
    @Column({ length: 100})
    plataforma: string;

    @ApiProperty()  
    @UpdateDateColumn()
    data: Date;

    @ApiProperty({ type: () => Categoria,isArray: true }) // Aqui diz pro Swagger que o tipo é Categoria (e não array de categorias)
    // isArray: true → faz o Swagger mostrar o Json corretamente
    @ManyToMany(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE" //Aqui ta dizendo: Se apagar a categoria, apaga todos os produtos dessa categoria
    })
        @JoinTable({
            name: "tb_produto_categoria", // tabela intermediaria
            joinColumn: {
                name: "produto_id", //Nome da FK que aponta para o produto
                referencedColumnName: "id"
            },
            inverseJoinColumn: {
                name: "categoria_id", //Nome da FK que aponta para Categoria
                referencedColumnName: "id"

            }
        })
    @ApiProperty({ type: () => Categoria })
    categoria: Categoria[]; //Aqui criei um array, pois um jogo pode ter varias categorias


}