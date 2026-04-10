import { ApiProperty } from "@nestjs/swagger"

export class UsuarioLogin {

    @ApiProperty() 
    public usuario: string // vai pedir o email do usuario
    @ApiProperty() 
    public senha: string
    public token?: string // O Nest preencherá após o login com sucesso
}