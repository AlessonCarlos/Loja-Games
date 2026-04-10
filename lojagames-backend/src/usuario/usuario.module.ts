import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { forwardRef, Module } from "@nestjs/common";
import { UsuarioController } from "./controllers/usuario.controller";
import { UsuarioService } from "./service/usuario.service";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario]),
forwardRef(() => AuthModule) // forwardRef usando para os modulos não entrarem em loop
],
    providers: [UsuarioService],
    controllers: [UsuarioController],
    exports: [TypeOrmModule, UsuarioService],
})
export class UsuarioModule { }
