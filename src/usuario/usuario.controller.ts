import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('usuarios')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController {

    constructor(
        private readonly usuarioService: UsuarioService,
    ) {}
}
