import { Module } from '@nestjs/common';
import { ConductorVehiculoService } from './conductor-vehiculo.service';
import { ConductorEntity } from '../conductor/conductor.entity/conductor.entity';
import { VehiculoEntity } from '../vehiculo/vehiculo.entity/vehiculo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductorVehiculoController } from './conductor-vehiculo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConductorEntity, VehiculoEntity])],
  providers: [ConductorVehiculoService],
  controllers: [ConductorVehiculoController]
})
export class ConductorVehiculoModule {}
