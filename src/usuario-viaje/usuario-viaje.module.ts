import { Module } from '@nestjs/common';
import { UsuarioViajeService } from './usuario-viaje.service';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { ViajeEntity } from '../viaje/viaje.entity/viaje.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, ViajeEntity])],
  providers: [UsuarioViajeService]
})
export class UsuarioViajeModule {}
