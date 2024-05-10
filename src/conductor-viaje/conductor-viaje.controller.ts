import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ConductorViajeService } from './conductor-viaje.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('conductores')
@UseInterceptors(BusinessErrorsInterceptor)
export class ConductorViajeController {

    constructor(
        private readonly conductorViajeService: ConductorViajeService,
    ) {}
}
