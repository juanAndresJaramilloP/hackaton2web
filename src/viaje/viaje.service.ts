import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViajeEntity } from './viaje.entity/viaje.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ViajeService {

    constructor(    
        @InjectRepository(ViajeEntity)
        private readonly viajeRepository: Repository<ViajeEntity>
    ) {}

    async findAll(): Promise<ViajeEntity[]> {
        return await this.viajeRepository.find({relations: ['conductor','usuario','vehiculo']});
    }

    async findOne(id: string): Promise<ViajeEntity> {
        const viaje = await this.viajeRepository.findOne({where: {id}, relations: ['conductor','usuario','vehiculo']});
        if(!viaje) {
            throw new BusinessLogicException("The journey with the given id was not found", BusinessError.NOT_FOUND);
        }
        return viaje;
    }

    async create(viaje: ViajeEntity): Promise<ViajeEntity> {
        return await this.viajeRepository.save(viaje);
    }

    async update(id: string, viaje: ViajeEntity): Promise<ViajeEntity> {
        const persistedviaje: ViajeEntity = await this.viajeRepository.findOne({where:{id}});
        if (!persistedviaje)
          throw new BusinessLogicException("The journey with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.viajeRepository.save({...persistedviaje, ...viaje});
    }

    async delete(id: string) {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({where:{id}});
        if (!viaje)
          throw new BusinessLogicException("The journey with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.viajeRepository.remove(viaje);
    }
}
