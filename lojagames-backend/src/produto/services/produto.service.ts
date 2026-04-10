import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CategoriaService } from 'src/categoria/services/categoria.service';

// Aqui sera implementado os metodos da aplicação
@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,

        private categoriaService: CategoriaService
    ) {}
//implementando o método findAll()
    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: { // Agora exibe o array de categorias de cada produto
                categoria: true
            }
        })
            
    }

//implementando o método findByID
    async findById(id: number): Promise<Produto> {
        let produto = await this.produtoRepository.findOne({

            relations: {
                categoria: true
            },

            where: {
                id
            }
            
        });

        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)

        return produto;
    }
//implementando o método findByNome
    async findByNome(nome: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },

            relations: {
                categoria: true
            }
        })
    }
//implementando o método create
    async create(produto: Produto): Promise<Produto>{
        if(produto.categoria) {
            //Percorre o array de categorias enviaado no Json e valida uma por uma
            for (const cat of produto.categoria) {
            await this.categoriaService.findById(cat.id);
        }
        }
        //O save() cuida de inserir o novo registro e tetornar o objeto com ID e Data
    return await this.produtoRepository.save(produto);
    }
//implementando o método update
    async update(produto: Produto): Promise<Produto>{
    //1° Verificar se o produto existe. Se não existir, o findById lança o erro
    await this.findById(produto.id)
        
    if(produto.categoria) {
            //Percorre o array de categorias enviaado no Json e valida uma por uma
            for (const cat of produto.categoria) {
            await this.categoriaService.findById(cat.id);
        }
    }

    //2° Se existir, o save() identifica o ID e faz o update no banco de dados.
    return await this.produtoRepository.save(produto);

}
//implementando o método delete
    async delete(id: number): Promise<DeleteResult>{
    //1° verificar se o produto existe antes de deletar
    await this.findById(id);

    //2° Se exisitir, executa a exclusão
    return await this.produtoRepository.delete(id)
    }
}