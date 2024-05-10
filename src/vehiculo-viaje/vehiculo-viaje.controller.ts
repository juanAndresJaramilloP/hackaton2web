import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { VehiculoViajeService } from './vehiculo-viaje.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('vehiculos')
@UseInterceptors(BusinessErrorsInterceptor)
export class VehiculoViajeController {

    constructor(
        private readonly vehiculoViajeService: VehiculoViajeService,
    ) {}
}
