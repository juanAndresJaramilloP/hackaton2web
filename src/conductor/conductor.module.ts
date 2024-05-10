import { Module } from '@nestjs/common';
import { ConductorService } from './conductor.service';

@Module({
  providers: [ConductorService]
})
export class ConductorModule {}
