import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { VehiculoViajeService } from './vehiculo-viaje.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ViajeEntity } from '../viaje/viaje.entity/viaje.entity';
import { ViajeDto } from '../viaje/viaje.dto';

@Controller('vehiculos')
@UseInterceptors(BusinessErrorsInterceptor)
export class VehiculoViajeController {

    constructor(
        private readonly vehiculoViajeService: VehiculoViajeService,
    ) {}

    @Post(':vehiculoId/viajes/:viajeId')
    async addViajeVehiculo(@Param('vehiculoId') vehiculoId: string, @Param('viajeId') viajeId: string){
        return await this.vehiculoViajeService.addViajeVehiculo(vehiculoId, viajeId);
    }

    @Get(':vehiculoId/viajes/:viajeId')
    async findViajeByVehiculoIdViajeId(@Param('vehiculoId') vehiculoId: string, @Param('viajeId') viajeId: string){
        return await this.vehiculoViajeService.findViajeByVehiculoIdViajeId(vehiculoId, viajeId);
    }

    @Get(':vehiculoId/viajes')
    async findViajesByVehiculoId(@Param('vehiculoId') vehiculoId: string){
        return await this.vehiculoViajeService.findViajesByVehiculoId(vehiculoId);
    }

    @Put(':vehiculoId/viajes')
    async associateViajesVehiculo(@Body() viajesDto: ViajeDto[], @Param('vehiculoId') vehiculoId: string){
        const viajes = plainToInstance(ViajeEntity, viajesDto)
        return await this.vehiculoViajeService.associateViajesVehiculo(vehiculoId, viajes);
    }
    
    @Delete(':vehiculoId/viajes/:viajeId')
    @HttpCode(204)
    async deleteViajeVehiculo(@Param('vehiculoId') vehiculoId: string, @Param('viajeId') viajeId: string){
        return await this.vehiculoViajeService.deleteViajeVehiculo(vehiculoId, viajeId);
    }
}
