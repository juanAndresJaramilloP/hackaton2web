import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { UsuarioViajeService } from './usuario-viaje.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('usuarios')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioViajeController {

    constructor(
        private readonly usuarioViajeService: UsuarioViajeService,
    ) {}
}
