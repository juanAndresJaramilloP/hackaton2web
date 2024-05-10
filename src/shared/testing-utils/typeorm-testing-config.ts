import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductorEntity } from '../../conductor/conductor.entity/conductor.entity';
import { VehiculoEntity } from '../../vehiculo/vehiculo.entity/vehiculo.entity';
import { ViajeEntity } from '../../viaje/viaje.entity/viaje.entity';
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';


export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([ConductorEntity, VehiculoEntity, ViajeEntity, UsuarioEntity]),
];