import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UsuarioEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombreUsuario: string;

    @Column()
    identificacion: string;

    @Column()
    telefono: string;

    @Column()
    correo: string;

    @Column()
    contrasena: string;

    @Column()
    numTarjeta: string;

    @Column()
    codSeguridad: string;

    @OneToMany(()=> ViajeEntity, viaje => viaje.usuario)
    viajes: ViajeEntity[];

}
