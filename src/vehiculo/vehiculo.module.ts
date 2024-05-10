import { Module } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { VehiculoEntity } from './vehiculo.entity/vehiculo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculoController } from './vehiculo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VehiculoEntity])],
  providers: [VehiculoService],
  controllers: [VehiculoController]
})
export class VehiculoModule {}
