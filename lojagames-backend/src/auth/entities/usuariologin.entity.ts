export class UsuarioLogin {
    public usuario: string // vai pedir o email do usuario
    public senha: string
    public token?: string // O Nest preencherá após o login com sucesso
}