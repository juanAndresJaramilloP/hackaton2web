import { ConductorEntity } from 'src/conductor/conductor.entity/conductor.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { VehiculoEntity } from 'src/vehiculo/vehiculo.entity/vehiculo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class ViajeEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    dirOrigen: string;
    
    @Column()
    dirDestino: string;

    @Column()
    fecha: string;

    @Column()
    horaInicio: string;

    @Column()
    horaFin: string;

    @Column()
    valor: string;

    @Column()
    metodoPago: string;

    @ManyToOne(()=> ConductorEntity, conductor => conductor.viajes)
    conductor: ConductorEntity;

    @ManyToOne(()=> UsuarioEntity, usuario => usuario.viajes)
    usuario: UsuarioEntity;

    @ManyToOne(()=> VehiculoEntity, vehiculo => vehiculo.viajes)
    vehiculo: VehiculoEntity;
    
}
