import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put } from "@nestjs/common";
import { UsuarioService } from "../service/usuario.service";
import { Usuario } from "../entities/usuario.entity";

@Controller("/usuarios")
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll()
    }

    @Post('/cadastrar')//rota para cadastrar novos usuarios
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.create(usuario)
    }

    @Put('/atualizar')//rota para atualizar usuarios
    @HttpCode(HttpStatus.CREATED)
    async update(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.update(usuario)
    }

    
}