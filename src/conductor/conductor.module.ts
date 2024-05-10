import { Module } from '@nestjs/common';
import { ConductorService } from './conductor.service';
import { ConductorEntity } from './conductor.entity/conductor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductorController } from './conductor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConductorEntity])],
  providers: [ConductorService],
  controllers: [ConductorController]
})
export class ConductorModule {}
