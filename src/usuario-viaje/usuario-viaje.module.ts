import { Module } from '@nestjs/common';
import { UsuarioViajeService } from './usuario-viaje.service';

@Module({
  providers: [UsuarioViajeService]
})
export class UsuarioViajeModule {}
