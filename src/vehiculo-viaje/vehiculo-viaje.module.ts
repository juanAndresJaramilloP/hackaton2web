import { Module } from '@nestjs/common';
import { VehiculoViajeService } from './vehiculo-viaje.service';

@Module({
  providers: [VehiculoViajeService]
})
export class VehiculoViajeModule {}
