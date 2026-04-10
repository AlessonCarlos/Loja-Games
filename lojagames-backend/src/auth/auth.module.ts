import { Module, forwardRef } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { LocalStrategy } from "./strategy/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsuarioModule } from "../usuario/usuario.module";

@Module({
    imports: [
        forwardRef(() => UsuarioModule),
        PassportModule,
        JwtModule.register({
            secret: 'segredo-super-seguro',
            signOptions: { expiresIn: '1h' }
        })
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        Bcrypt
    ],
    exports: [Bcrypt]
})
export class AuthModule {}