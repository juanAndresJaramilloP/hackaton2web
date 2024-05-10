import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ViajeService } from './viaje.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ViajeDto } from './viaje.dto';
import { ViajeEntity } from './viaje.entity/viaje.entity';

@Controller('viajes')
@UseInterceptors(BusinessErrorsInterceptor)
export class ViajeController {

    constructor(
        private readonly viajeService: ViajeService,
    ) {}

    @Get()
    async findAll() {
      return await this.viajeService.findAll();
    }
  
    @Get(':viajeId')
    async findOne(@Param('viajeId') viajeId: string) {
      return await this.viajeService.findOne(viajeId);
    }
  
    @Post()
    async create(@Body() ViajeDto: ViajeDto) {
      const viaje: ViajeEntity = plainToInstance(ViajeEntity, ViajeDto);
      return await this.viajeService.create(viaje);
    }
  
    @Put(':viajeId')
    async update(@Param('viajeId') viajeId: string, @Body() ViajeDto: ViajeDto) {
      const viaje: ViajeEntity = plainToInstance(ViajeEntity, ViajeDto);
      return await this.viajeService.update(viajeId, viaje);
    }
  
    @Delete(':viajeId')
    @HttpCode(204)
    async delete(@Param('viajeId') viajeId: string) {
      return await this.viajeService.delete(viajeId);
    }
}
