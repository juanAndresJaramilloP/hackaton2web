import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ConductorDto } from './conductor.dto';
import { ConductorEntity } from './conductor.entity/conductor.entity';
import { ConductorService } from './conductor.service';

@Controller('conductores')
@UseInterceptors(BusinessErrorsInterceptor)
export class ConductorController {

    constructor(
        private readonly conductorService: ConductorService,
    ) {}

    @Get()
    async findAll() {
      return await this.conductorService.findAll();
    }
  
    @Get(':conductorId')
    async findOne(@Param('conductorId') conductorId: string) {
      return await this.conductorService.findOne(conductorId);
    }
  
    @Post()
    async create(@Body() ConductorDto: ConductorDto) {
      const conductor: ConductorEntity = plainToInstance(ConductorEntity, ConductorDto);
      return await this.conductorService.create(conductor);
    }
  
    @Put(':conductorId')
    async update(@Param('conductorId') conductorId: string, @Body() ConductorDto: ConductorDto) {
      const conductor: ConductorEntity = plainToInstance(ConductorEntity, ConductorDto);
      return await this.conductorService.update(conductorId, conductor);
    }
  
    @Delete(':conductorId')
    @HttpCode(204)
    async delete(@Param('conductorId') conductorId: string) {
      return await this.conductorService.delete(conductorId);
    }
  

}
