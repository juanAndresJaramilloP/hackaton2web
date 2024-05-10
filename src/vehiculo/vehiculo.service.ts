import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiculoEntity } from './vehiculo.entity/vehiculo.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class VehiculoService {

    constructor(    
        @InjectRepository(VehiculoEntity)
        private readonly vehiculoRepository: Repository<VehiculoEntity>
    ) {}

    async findAll(): Promise<VehiculoEntity[]> {
        return await this.vehiculoRepository.find({relations: ['conductor','viajes']});
    }

    async findOne(id: string): Promise<VehiculoEntity> {
        const vehiculo = await this.vehiculoRepository.findOne({where: {id}, relations: ['conductor', 'viajes']});
        if(!vehiculo) {
            throw new BusinessLogicException("The vehicle with the given id was not found", BusinessError.NOT_FOUND);
        }
        return vehiculo;
    }

    async create(vehiculo: VehiculoEntity): Promise<VehiculoEntity> {
        return await this.vehiculoRepository.save(vehiculo);
    }

    async update(id: string, vehiculo: VehiculoEntity): Promise<VehiculoEntity> {
        const persistedvehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({where:{id}});
        if (!persistedvehiculo)
          throw new BusinessLogicException("The vehicle with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.vehiculoRepository.save({...persistedvehiculo, ...vehiculo});
    }

    async delete(id: string) {
        const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({where:{id}});
        if (!vehiculo)
          throw new BusinessLogicException("The vehicle with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.vehiculoRepository.remove(vehiculo);
    }
}
