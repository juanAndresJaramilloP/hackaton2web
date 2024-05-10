import { Module } from '@nestjs/common';
import { VehiculoViajeService } from './vehiculo-viaje.service';
import { VehiculoEntity } from '../vehiculo/vehiculo.entity/vehiculo.entity';
import { ViajeEntity } from '../viaje/viaje.entity/viaje.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VehiculoEntity, ViajeEntity])],
  providers: [VehiculoViajeService]
})
export class VehiculoViajeModule {}
