import { Module } from '@nestjs/common';
import { ViajeService } from './viaje.service';
import { ViajeEntity } from './viaje.entity/viaje.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViajeController } from './viaje.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ViajeEntity])],
  providers: [ViajeService],
  controllers: [ViajeController]
})
export class ViajeModule {}
