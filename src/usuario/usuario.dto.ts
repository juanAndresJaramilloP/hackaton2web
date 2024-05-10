import {IsEmail, IsNotEmpty, IsNumberString, IsString} from 'class-validator';

export class UsuarioDto {

    @IsString()
    @IsNotEmpty()
    readonly nombreUsuario: string;

    @IsNumberString()
    @IsNotEmpty()
    readonly identificacion: string;

    @IsNumberString()
    @IsNotEmpty()
    readonly telefono: string;

    @IsEmail()
    @IsNotEmpty()
    readonly correo: string;

    @IsNotEmpty()
    readonly contrasena: string;

    @IsString()
    @IsNotEmpty()
    readonly numTarjeta: string;

    @IsNumberString()
    @IsNotEmpty()
    readonly codSeguridad: string;
}
