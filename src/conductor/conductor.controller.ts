import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ConductorService } from './conductor.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('conductores')
@UseInterceptors(BusinessErrorsInterceptor)
export class ConductorController {

    constructor(
        private readonly conductorService: ConductorService,
    ) {}

}
