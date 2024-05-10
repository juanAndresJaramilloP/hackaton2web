import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ConductorVehiculoService } from './conductor-vehiculo.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('conductores')
@UseInterceptors(BusinessErrorsInterceptor)
export class ConductorVehiculoController {

    constructor(
        private readonly conductorVehiculoService: ConductorVehiculoService,
    ) {}
}
