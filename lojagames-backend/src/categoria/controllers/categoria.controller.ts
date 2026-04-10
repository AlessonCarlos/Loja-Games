import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("/categorias")

@ApiTags('Categorias') // 🔹 Define a "tag" desse controller no Swagger (organiza os endpoints)
@ApiBearerAuth()       // 🔹 Indica que as rotas usam autenticação via Bearer Token (JWT, por exemplo)

export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) {}
    
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
        return this.categoriaService.findById(id)
    }

    @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK)
    findAllByDescricao(@Param('descricao') descricao: string): Promise<Categoria[]> {
        return this.categoriaService.findAllByDescricao(descricao);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.create(categoria)
    }

    @Put()
    @HttpCode(HttpStatus.CREATED)
    update(@Body() categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.create(categoria)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.categoriaService.delete(id)
    }
}
    




