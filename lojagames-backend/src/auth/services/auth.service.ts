import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/service/usuario.service';
import { Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService,
        private readonly bcrypt: Bcrypt

    ) {}

async validateUser(usuario: string, senha: string): Promise<any> {

    const user = await this.usuarioService.findByUsuario(usuario);

    if (!user) return null;

    const senhaInvalida = await this.bcrypt.compararSenha(
        senha,
        user.senha
    );

    if(!senhaInvalida) return null;

    const { senha: _, ...result } = user;

    return result;
}

async login(user: any): Promise<any> {

    const payload = {
        sub: user.id,
        usuario: user.usuario
    };

    const token = this.jwtService.sign(payload);

    return {
        usuario: user.usuario,
        token: `Bearer ${token}`
    }
}

}