import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ConductorModule } from './conductor/conductor.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';
import { ViajeModule } from './viaje/viaje.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioViajeModule } from './usuario-viaje/usuario-viaje.module';
import { ConductorViajeModule } from './conductor-viaje/conductor-viaje.module';
import { ConductorVehiculoModule } from './conductor-vehiculo/conductor-vehiculo.module';
import { VehiculoViajeModule } from './vehiculo-viaje/vehiculo-viaje.module';

@Module({
  imports: [UsuarioModule, ConductorModule, VehiculoModule, ViajeModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'hackaton',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    UsuarioViajeModule,
    ConductorViajeModule,
    ConductorVehiculoModule,
    VehiculoViajeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
