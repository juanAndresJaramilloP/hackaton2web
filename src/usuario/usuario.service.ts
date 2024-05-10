import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class UsuarioService {

    constructor(    
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async findAll(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.find({relations: ['viajes']});
    }

    async findOne(id: string): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOne({where: {id}, relations: ['viajes']});
        if(!usuario) {
            throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);
        }
        return usuario;
    }

    async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        return await this.usuarioRepository.save(usuario);
    }

    async update(id: string, usuario: UsuarioEntity): Promise<UsuarioEntity> {
        const persistedusuario: UsuarioEntity = await this.usuarioRepository.findOne({where:{id}});
        if (!persistedusuario)
          throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.usuarioRepository.save({...persistedusuario, ...usuario});
    }

    async delete(id: string) {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where:{id}});
        if (!usuario)
          throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.usuarioRepository.remove(usuario);
    }

}
