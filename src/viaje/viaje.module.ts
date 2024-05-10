import { Module } from '@nestjs/common';
import { ViajeService } from './viaje.service';

@Module({
  providers: [ViajeService]
})
export class ViajeModule {}
