import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConductorEntity } from '../conductor/conductor.entity/conductor.entity';
import { VehiculoEntity } from '../vehiculo/vehiculo.entity/vehiculo.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';


@Injectable()
export class ConductorVehiculoService {

    constructor(
        @InjectRepository(ConductorEntity)
        private readonly conductorRepository: Repository<ConductorEntity>,
        @InjectRepository(VehiculoEntity)
        private readonly vehiculoRepository: Repository<VehiculoEntity>,
    ) {}

    async addVehiculoConductor(conductorId: string, vehiculoId: string): Promise<ConductorEntity> {
        const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({where: {id: vehiculoId}});
        if (!vehiculo)
          throw new BusinessLogicException("The vehicle with the given id was not found", BusinessError.NOT_FOUND);
       
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where: {id: conductorId}, relations: ["viajes", "vehiculos"]}) 
        if (!conductor)
          throw new BusinessLogicException("The driver with the given id was not found", BusinessError.NOT_FOUND);
     
        conductor.vehiculos = [...conductor.vehiculos, vehiculo];
        return await this.conductorRepository.save(conductor);
      }
     
    async findVehiculoByConductorIdVehiculoId(conductorId: string, vehiculoId: string): Promise<VehiculoEntity> {
        const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({where: {id: vehiculoId}});
        if (!vehiculo)
          throw new BusinessLogicException("The vehicle with the given id was not found", BusinessError.NOT_FOUND)
        
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where: {id: conductorId}, relations: ["vehiculos"]}); 
        if (!conductor)
          throw new BusinessLogicException("The driver with the given id was not found", BusinessError.NOT_FOUND)
    
        const conductorVehiculo: VehiculoEntity = conductor.vehiculos.find(e => e.id === vehiculo.id);
    
        if (!conductorVehiculo)
          throw new BusinessLogicException("The vehicle with the given id is not associated to the driver", BusinessError.PRECONDITION_FAILED)
    
        return conductorVehiculo;
    }
     
    async findVehiculoByconductorId(conductorId: string): Promise<VehiculoEntity[]> {
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where: {id: conductorId}, relations: ["vehiculos"]});
        if (!conductor)
          throw new BusinessLogicException("The driver with the given id was not found", BusinessError.NOT_FOUND)
        
        return conductor.vehiculos;
    }
     
    async associateVehiculosConductor(conductorId: string, vehiculos: VehiculoEntity[]): Promise<ConductorEntity> {
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where: {id: conductorId}, relations: ["vehiculos"]});
     
        if (!conductor)
          throw new BusinessLogicException("The driver with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < vehiculos.length; i++) {
          const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({where: {id: vehiculos[i].id}});
          if (!vehiculo)
            throw new BusinessLogicException("The vehicle with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        conductor.vehiculos = vehiculos;
        return await this.conductorRepository.save(conductor);
      }
     
    async deleteVehiculoConductor(conductorId: string, vehiculoId: string){
        const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({where: {id: vehiculoId}});
        if (!vehiculo)
          throw new BusinessLogicException("The vehicle with the given id was not found", BusinessError.NOT_FOUND)
     
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where: {id: conductorId}, relations: ["vehiculos"]});
        if (!conductor)
          throw new BusinessLogicException("The driver with the given id was not found", BusinessError.NOT_FOUND)
     
        const ConductorVehiculo: VehiculoEntity = conductor.vehiculos.find(e => e.id === vehiculo.id);
     
        if (!ConductorVehiculo)
            throw new BusinessLogicException("The vehicle with the given id is not associated to the driver", BusinessError.PRECONDITION_FAILED)

        conductor.vehiculos = conductor.vehiculos.filter(e => e.id !== vehiculoId);
        await this.conductorRepository.save(conductor);
    }   
}
