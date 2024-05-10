import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConductorEntity } from '../conductor/conductor.entity/conductor.entity';
import { ViajeEntity } from '../viaje/viaje.entity/viaje.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ConductorViajeService {

    constructor(
        @InjectRepository(ConductorEntity)
        private readonly conductorRepository: Repository<ConductorEntity>,
        @InjectRepository(ViajeEntity)
        private readonly viajeRepository: Repository<ViajeEntity>,
    ) {}

    async addViajeConductor(conductorId: string, viajeId: string): Promise<ConductorEntity> {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajeId}});
        if (!viaje)
          throw new BusinessLogicException("The journey with the given id was not found", BusinessError.NOT_FOUND);
       
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where: {id: conductorId}, relations: ["viajes"]}) 
        if (!conductor)
          throw new BusinessLogicException("The driver with the given id was not found", BusinessError.NOT_FOUND);
     
        conductor.viajes = [...conductor.viajes, viaje];
        return await this.conductorRepository.save(conductor);
      }
     
    async findViajeByConductorIdViajeId(conductorId: string, viajeId: string): Promise<ViajeEntity> {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajeId}});
        if (!viaje)
          throw new BusinessLogicException("The journey with the given id was not found", BusinessError.NOT_FOUND)
        
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where: {id: conductorId}, relations: ["viajes"]}); 
        if (!conductor)
          throw new BusinessLogicException("The driver with the given id was not found", BusinessError.NOT_FOUND)
    
        const conductorViaje: ViajeEntity = conductor.viajes.find(e => e.id === viaje.id);
    
        if (!conductorViaje)
          throw new BusinessLogicException("The journey with the given id is not associated to the driver", BusinessError.PRECONDITION_FAILED)
    
        return conductorViaje;
    }
     
    async findViajesByconductorId(conductorId: string): Promise<ViajeEntity[]> {
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where: {id: conductorId}, relations: ["viajes"]});
        if (!conductor)
          throw new BusinessLogicException("The driver with the given id was not found", BusinessError.NOT_FOUND)
        
        return conductor.viajes;
    }
     
    async associateViajesConductor(conductorId: string, viajes: ViajeEntity[]): Promise<ConductorEntity> {
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where: {id: conductorId}, relations: ["viajes"]});
     
        if (!conductor)
          throw new BusinessLogicException("The driver with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < viajes.length; i++) {
          const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajes[i].id}});
          if (!viaje)
            throw new BusinessLogicException("The journey with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        conductor.viajes = viajes;
        return await this.conductorRepository.save(conductor);
      }
     
    async deleteViajeConductor(conductorId: string, viajeId: string){
        const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajeId}});
        if (!viaje)
          throw new BusinessLogicException("The journey with the given id was not found", BusinessError.NOT_FOUND)
     
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where: {id: conductorId}, relations: ["viajes"]});
        if (!conductor)
          throw new BusinessLogicException("The driver with the given id was not found", BusinessError.NOT_FOUND)
     
        const conductorViaje: ViajeEntity = conductor.viajes.find(e => e.id === viaje.id);
     
        if (!conductorViaje)
            throw new BusinessLogicException("The journey with the given id is not associated to the driver", BusinessError.PRECONDITION_FAILED)

        conductor.viajes = conductor.viajes.filter(e => e.id !== viajeId);
        await this.conductorRepository.save(conductor);
    }  
}
