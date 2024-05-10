import { VehiculoEntity } from 'src/vehiculo/vehiculo.entity/vehiculo.entity';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class ConductorEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombreUsuario: string;
    
    @Column()
    contrasena: string;

    @Column()
    nombreCompleto: string;

    @Column()
    identificacion: string;

    @Column()
    telefono: string;

    @Column()
    correo: string;

    @Column()
    fotoLicenciaFrontal: string;

    @Column()
    fotoLicenciaTrasera: string;

    @OneToMany(()=> ViajeEntity, viaje => viaje.conductor)
    viajes: ViajeEntity[];

    @OneToMany(()=> VehiculoEntity, vehiculo => vehiculo.conductor)
    vehiculos: VehiculoEntity[];

}
