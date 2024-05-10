import { Module } from '@nestjs/common';
import { ConductorViajeService } from './conductor-viaje.service';
import { ConductorEntity } from '../conductor/conductor.entity/conductor.entity';
import { ViajeEntity } from '../viaje/viaje.entity/viaje.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductorViajeController } from './conductor-viaje.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConductorEntity, ViajeEntity])],
  providers: [ConductorViajeService],
  controllers: [ConductorViajeController]
})
export class ConductorViajeModule {}
