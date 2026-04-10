import { Body, Controller, Post, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('/auth')

@ApiTags('Usuarios') //Agrupa esse endpoint junto com o módulo de usuários no Swagger

export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/logar')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { usuario: string; senha: string }): Promise<any> {
    return this.authService.login(body);
  }
}