import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ConductorVehiculoService } from './conductor-vehiculo.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { VehiculoEntity } from '../vehiculo/vehiculo.entity/vehiculo.entity';
import { VehiculoDto } from '../vehiculo/vehiculo.dto';

@Controller('conductores')
@UseInterceptors(BusinessErrorsInterceptor)
export class ConductorVehiculoController {

    constructor(
        private readonly conductorVehiculoService: ConductorVehiculoService,
    ) {}

    @Post(':conductorId/vehiculos/:vehiculoId')
    async addVehiculoConductor(@Param('conductorId') conductorId: string, @Param('vehiculoId') vehiculoId: string){
        return await this.conductorVehiculoService.addVehiculoConductor(conductorId, vehiculoId);
    }

    @Get(':conductorId/vehiculos/:vehiculoId')
    async findVehiculoByConductorIdVehiculoId(@Param('conductorId') conductorId: string, @Param('vehiculoId') vehiculoId: string){
        return await this.conductorVehiculoService.findVehiculoByConductorIdVehiculoId(conductorId, vehiculoId);
    }

    @Get(':conductorId/vehiculos')
    async findVehiculosByconductorId(@Param('conductorId') conductorId: string){
        return await this.conductorVehiculoService.findVehiculosByconductorId(conductorId);
    }

    @Put(':conductorId/vehiculos')
    async associateVehiculosConductor(@Body() vehiculosDto: VehiculoDto[], @Param('conductorId') conductorId: string){
        const vehiculos = plainToInstance(VehiculoEntity, vehiculosDto)
        return await this.conductorVehiculoService.associateVehiculosConductor(conductorId, vehiculos);
    }
    
    @Delete(':conductorId/vehiculos/:vehiculoId')
    @HttpCode(204)
    async deleteVehiculoConductor(@Param('conductorId') conductorId: string, @Param('vehiculoId') vehiculoId: string){
        return await this.conductorVehiculoService.deleteVehiculoConductor(conductorId, vehiculoId);
    }
}
