import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ViajeService } from './viaje.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('viajes')
@UseInterceptors(BusinessErrorsInterceptor)
export class ViajeController {

    constructor(
        private readonly viajeService: ViajeService,
    ) {}
}
