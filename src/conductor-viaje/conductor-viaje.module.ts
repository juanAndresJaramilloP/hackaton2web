import { Module } from '@nestjs/common';
import { ConductorViajeService } from './conductor-viaje.service';
import { ConductorEntity } from '../conductor/conductor.entity/conductor.entity';
import { ViajeEntity } from '../viaje/viaje.entity/viaje.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ConductorEntity, ViajeEntity])],
  providers: [ConductorViajeService]
})
export class ConductorViajeModule {}
