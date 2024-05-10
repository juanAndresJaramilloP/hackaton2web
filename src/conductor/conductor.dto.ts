import {IsEmail, IsNotEmpty, IsNumberString, IsString, IsUrl} from 'class-validator';

export class ConductorDto {

    @IsString()
    @IsNotEmpty()
    readonly nombreUsuario: string;
    
    @IsNotEmpty()
    readonly contrasena: string;

    @IsString()
    @IsNotEmpty()
    readonly nombreCompleto: string;

    @IsNumberString()
    @IsNotEmpty()
    readonly identificacion: string;

    @IsNumberString()
    @IsNotEmpty()
    readonly telefono: string;

    @IsEmail()
    @IsNotEmpty()
    readonly correo: string;

    @IsUrl()
    @IsNotEmpty()
    readonly fotoLicenciaFrontal: string;

    @IsUrl()
    @IsNotEmpty()
    readonly fotoLicenciaTrasera: string;
}
