import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable()
export class Bcrypt {
    // Transforma a senha em um Hash para salvar no banco;
    async criptoSenha(senha: string): Promise<string> {
        let saltos: number = 10;
        return await bcrypt.hash(senha, saltos);
    }

    // Agora vou comparar o que o usuario digitou no login com o que ta no banco de dados;
    async compararSenha(senhaDigitada: string, senhaBanco: string): Promise<boolean>{
        return await bcrypt.compare(senhaDigitada, senhaBanco)
    }
}