import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { ConductorEntity } from 'src/conductor/conductor.entity/conductor.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class VehiculoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    placa: string;
    
    @Column()
    marca: string;

    @Column()
    modelo: string;

    @Column()
    color: string;

    @Column()
    fotoVehiculo: string;

    @OneToMany(()=> ViajeEntity, viaje => viaje.vehiculo)
    viajes: ViajeEntity[];

    @ManyToOne(()=> ConductorEntity, conductor => conductor.vehiculos)
    conductor: ConductorEntity;

}
