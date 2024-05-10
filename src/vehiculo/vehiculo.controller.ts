import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { VehiculoService } from './vehiculo.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { VehiculoDto } from './vehiculo.dto';
import { VehiculoEntity } from './vehiculo.entity/vehiculo.entity';

@Controller('vehiculos')
@UseInterceptors(BusinessErrorsInterceptor)
export class VehiculoController {

    constructor(
        private readonly vehiculoService: VehiculoService,
    ) {}

    @Get()
    async findAll() {
      return await this.vehiculoService.findAll();
    }
  
    @Get(':vehiculoId')
    async findOne(@Param('vehiculoId') vehiculoId: string) {
      return await this.vehiculoService.findOne(vehiculoId);
    }
  
    @Post()
    async create(@Body() VehiculoDto: VehiculoDto) {
      const vehiculo: VehiculoEntity = plainToInstance(VehiculoEntity, VehiculoDto);
      return await this.vehiculoService.create(vehiculo);
    }
  
    @Put(':vehiculoId')
    async update(@Param('vehiculoId') vehiculoId: string, @Body() VehiculoDto: VehiculoDto) {
      const vehiculo: VehiculoEntity = plainToInstance(VehiculoEntity, VehiculoDto);
      return await this.vehiculoService.update(vehiculoId, vehiculo);
    }
  
    @Delete(':vehiculoId')
    @HttpCode(204)
    async delete(@Param('vehiculoId') vehiculoId: string) {
      return await this.vehiculoService.delete(vehiculoId);
    }
}
