import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../etities/produto.ennity";
import { ILike, Repository } from "typeorm";

// Aqui sera implementado os metodos da aplicação
@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
    ) {}
//implementando o método findAll()
    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find()
    }

//implementando o método findByID
    async findById(id: number): Promise<Produto> {
        let produto = await this.produtoRepository.findOne({
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
            }
        })
    }
//implementando o método create
    async create(produto: Produto): Promise<Produto>{
        //O save() cuida de inserir o novo registro e tetornar o objeto com ID e Data
    return await this.produtoRepository.save(produto);
    }
}