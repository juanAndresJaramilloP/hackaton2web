import {IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class ViajeDto {

    @IsString()
    @IsNotEmpty()
    readonly dirOrigen: string;
    
    @IsString()
    @IsNotEmpty()
    readonly dirDestino: string;

    @IsString()
    @IsNotEmpty()
    readonly fecha: string;

    @IsString()
    @IsNotEmpty()
    readonly horaInicio: string;

    @IsString()
    @IsNotEmpty()
    readonly horaFin: string;

    @IsNumber()
    @IsNotEmpty()
    readonly valor: string;

    @IsNumber()
    @IsNotEmpty()
    readonly metodoPago: string;
}
