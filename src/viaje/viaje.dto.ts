import {IsNotEmpty, IsString, IsNumber} from 'class-validator';


export class ViajeDto {

    @IsString()
    @IsNotEmpty()
    dirOrigen: string;
    
    @IsString()
    @IsNotEmpty()
    dirDestino: string;

    @IsString()
    @IsNotEmpty()
    fecha: string;

    @IsString()
    @IsNotEmpty()
    horaInicio: string;

    @IsString()
    @IsNotEmpty()
    horaFin: string;

    @IsNumber()
    @IsNotEmpty()
    valor: string;

    @IsNumber()
    @IsNotEmpty()
    metodoPago: string;
}
