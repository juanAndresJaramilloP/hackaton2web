import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('vehiculos')
@UseInterceptors(BusinessErrorsInterceptor)
export class VehiculoController {

    constructor(
        private readonly vehiculoService: VehiculoService,
    ) {}
}
