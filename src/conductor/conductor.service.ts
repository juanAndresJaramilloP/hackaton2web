import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConductorEntity } from './conductor.entity/conductor.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ConductorService {

    constructor(    
        @InjectRepository(ConductorEntity)
        private readonly conductorRepository: Repository<ConductorEntity>
    ) {}

    async findAll(): Promise<ConductorEntity[]> {
        return await this.conductorRepository.find({relations: ['vehiculos', 'viajes']});
    }

    async findOne(id: string): Promise<ConductorEntity> {
        const conductor = await this.conductorRepository.findOne({where: {id}, relations: ['vehiculos', 'viajes']});
        if(!conductor) {
            throw new BusinessLogicException("The driver with the given id was not found", BusinessError.NOT_FOUND);
        }
        return conductor;
    }

    async create(conductor: ConductorEntity): Promise<ConductorEntity> {
        return await this.conductorRepository.save(conductor);
    }

    async update(id: string, conductor: ConductorEntity): Promise<ConductorEntity> {
        const persistedconductor: ConductorEntity = await this.conductorRepository.findOne({where:{id}});
        if (!persistedconductor)
          throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.conductorRepository.save({...persistedconductor, ...conductor});
    }

    async delete(id: string) {
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where:{id}});
        if (!conductor)
          throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.conductorRepository.remove(conductor);
    }

}
