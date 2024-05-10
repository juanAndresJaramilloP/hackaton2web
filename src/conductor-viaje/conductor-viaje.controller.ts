import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ConductorViajeService } from './conductor-viaje.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ViajeEntity } from '../viaje/viaje.entity/viaje.entity';
import { ViajeDto } from '../viaje/viaje.dto';

@Controller('conductores')
@UseInterceptors(BusinessErrorsInterceptor)
export class ConductorViajeController {

    constructor(
        private readonly conductorViajeService: ConductorViajeService,
    ) {}

    @Post(':conductorId/viajes/:viajeId')
    async addViajeConductor(@Param('conductorId') conductorId: string, @Param('viajeId') viajeId: string){
        return await this.conductorViajeService.addViajeConductor(conductorId, viajeId);
    }

    @Get(':conductorId/viajes/:viajeId')
    async findViajeByConductorIdViajeId(@Param('conductorId') conductorId: string, @Param('viajeId') viajeId: string){
        return await this.conductorViajeService.findViajeByConductorIdViajeId(conductorId, viajeId);
    }

    @Get(':conductorId/viajes')
    async findViajesByconductorId(@Param('conductorId') conductorId: string){
        return await this.conductorViajeService.findViajesByconductorId(conductorId);
    }

    @Put(':conductorId/viajes')
    async associateViajesConductor(@Body() viajesDto: ViajeDto[], @Param('conductorId') conductorId: string){
        const viajes = plainToInstance(ViajeEntity, viajesDto)
        return await this.conductorViajeService.associateViajesConductor(conductorId, viajes);
    }
    
    @Delete(':conductorId/viajes/:viajeId')
    @HttpCode(204)
    async deleteViajeConductor(@Param('conductorId') conductorId: string, @Param('viajeId') viajeId: string){
        return await this.conductorViajeService.deleteViajeConductor(conductorId, viajeId);
    }
}
