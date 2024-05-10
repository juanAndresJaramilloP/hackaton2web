import {IsNotEmpty, IsString, IsUrl,IsNumberString} from 'class-validator';

export class VehiculoDto {

    @IsString()
    @IsNotEmpty()
    readonly placa: string;
    
    @IsString()
    @IsNotEmpty()
    readonly marca: string;

    @IsNumberString()
    @IsNotEmpty()
    readonly modelo: string;

    @IsString()
    @IsNotEmpty()
    readonly color: string;

    @IsUrl()
    @IsNotEmpty()
    readonly fotoVehiculo: string;
}
