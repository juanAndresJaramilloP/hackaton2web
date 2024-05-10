import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { ViajeEntity } from '../viaje/viaje.entity/viaje.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class UsuarioViajeService {

    constructor(

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        @InjectRepository(ViajeEntity)
        private readonly viajeRepository: Repository<ViajeEntity>,
    ) {}

    async addViajeUsuario(usuarioId: string, viajeId: string): Promise<UsuarioEntity> {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajeId}});
        if (!viaje)
          throw new BusinessLogicException("The journey with the given id was not found", BusinessError.NOT_FOUND);
       
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["viajes"]}) 
        if (!usuario)
          throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);
     
        usuario.viajes = [...usuario.viajes, viaje];
        return await this.usuarioRepository.save(usuario);
      }
     
    async findViajeByUsuarioIdViajeId(usuarioId: string, viajeId: string): Promise<ViajeEntity> {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajeId}});
        if (!viaje)
          throw new BusinessLogicException("The journey with the given id was not found", BusinessError.NOT_FOUND)
        
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["viajes"]}); 
        if (!usuario)
          throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND)
    
        const usuarioViaje: ViajeEntity = usuario.viajes.find(e => e.id === viaje.id);
    
        if (!usuarioViaje)
          throw new BusinessLogicException("The journey with the given id is not associated to the user", BusinessError.PRECONDITION_FAILED)
    
        return usuarioViaje;
    }
     
    async findViajesByUsuarioId(usuarioId: string): Promise<ViajeEntity[]> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["viajes"]});
        if (!usuario)
          throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND)
        
        return usuario.viajes;
    }
     
    async associateViajesUsuario(usuarioId: string, viajes: ViajeEntity[]): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["viajes"]});
     
        if (!usuario)
          throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < viajes.length; i++) {
          const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajes[i].id}});
          if (!viaje)
            throw new BusinessLogicException("The journey with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        usuario.viajes = viajes;
        return await this.usuarioRepository.save(usuario);
      }
     
    async deleteViajeUsuario(usuarioId: string, viajeId: string){
        const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajeId}});
        if (!viaje)
          throw new BusinessLogicException("The journey with the given id was not found", BusinessError.NOT_FOUND)
     
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["viajes"]});
        if (!usuario)
          throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND)
     
        const usuarioViaje: ViajeEntity = usuario.viajes.find(e => e.id === viaje.id);
     
        if (!usuarioViaje)
            throw new BusinessLogicException("The journey with the given id is not associated to the user", BusinessError.PRECONDITION_FAILED)

        usuario.viajes = usuario.viajes.filter(e => e.id !== viajeId);
        await this.usuarioRepository.save(usuario);
    }  

}
