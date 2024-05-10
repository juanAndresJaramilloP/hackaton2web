import { Module } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';

@Module({
  providers: [VehiculoService]
})
export class VehiculoModule {}
