import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UsuarioViajeService } from './usuario-viaje.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ViajeEntity } from '../viaje/viaje.entity/viaje.entity';
import { ViajeDto } from '../viaje/viaje.dto';

@Controller('usuarios')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioViajeController {

    constructor(
        private readonly usuarioViajeService: UsuarioViajeService,
    ) {}

    @Post(':usuarioId/viajes/:viajeId')
    async addViajeUsuario(@Param('usuarioId') usuarioId: string, @Param('viajeId') viajeId: string){
        return await this.usuarioViajeService.addViajeUsuario(usuarioId, viajeId);
    }

    @Get(':usuarioId/viajes/:viajeId')
    async findViajeByUsuarioIdViajeId(@Param('usuarioId') usuarioId: string, @Param('viajeId') viajeId: string){
        return await this.usuarioViajeService.findViajeByUsuarioIdViajeId(usuarioId, viajeId);
    }

    @Get(':usuarioId/viajes')
    async findViajesByUsuarioId(@Param('usuarioId') usuarioId: string){
        return await this.usuarioViajeService.findViajesByUsuarioId(usuarioId);
    }

    @Put(':usuarioId/viajes')
    async associateViajesUsuario(@Body() viajesDto: ViajeDto[], @Param('usuarioId') usuarioId: string){
        const viajes = plainToInstance(ViajeEntity, viajesDto)
        return await this.usuarioViajeService.associateViajesUsuario(usuarioId, viajes);
    }
    
    @Delete(':usuarioId/viajes/:viajeId')
    @HttpCode(204)
    async deleteViajeUsuario(@Param('usuarioId') usuarioId: string, @Param('viajeId') viajeId: string){
        return await this.usuarioViajeService.deleteViajeUsuario(usuarioId, viajeId);
    }
}
