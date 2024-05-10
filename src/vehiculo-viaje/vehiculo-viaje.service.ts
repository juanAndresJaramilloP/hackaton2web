import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiculoEntity } from '../vehiculo/vehiculo.entity/vehiculo.entity';
import { ViajeEntity } from '../viaje/viaje.entity/viaje.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class VehiculoViajeService {

    constructor(
        @InjectRepository(VehiculoEntity)
        private readonly vehiculoRepository: Repository<VehiculoEntity>,
        @InjectRepository(ViajeEntity)
        private readonly viajeRepository: Repository<ViajeEntity>,
    ) {}

    async addViajeVehiculo(vehiculoId: string, viajeId: string): Promise<VehiculoEntity> {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajeId}});
        if (!viaje)
          throw new BusinessLogicException("The journey with the given id was not found", BusinessError.NOT_FOUND);
       
        const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({where: {id: vehiculoId}, relations: ["viajes"]}) 
        if (!vehiculo)
          throw new BusinessLogicException("The vehicle with the given id was not found", BusinessError.NOT_FOUND);
     
        vehiculo.viajes = [...vehiculo.viajes, viaje];
        return await this.vehiculoRepository.save(vehiculo);
      }
     
    async findViajeByVehiculoIdViajeId(vehiculoId: string, viajeId: string): Promise<ViajeEntity> {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajeId}});
        if (!viaje)
          throw new BusinessLogicException("The journey with the given id was not found", BusinessError.NOT_FOUND)
        
        const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({where: {id: vehiculoId}, relations: ["viajes"]}); 
        if (!vehiculo)
          throw new BusinessLogicException("The vehicle with the given id was not found", BusinessError.NOT_FOUND)
    
        const vehiculoViaje: ViajeEntity = vehiculo.viajes.find(e => e.id === viaje.id);
    
        if (!vehiculoViaje)
          throw new BusinessLogicException("The journey with the given id is not associated to the vehicle", BusinessError.PRECONDITION_FAILED)
    
        return vehiculoViaje;
    }
     
    async findViajesByVehiculoId(vehiculoId: string): Promise<ViajeEntity[]> {
        const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({where: {id: vehiculoId}, relations: ["viajes"]});
        if (!vehiculo)
          throw new BusinessLogicException("The vehicle with the given id was not found", BusinessError.NOT_FOUND)
        
        return vehiculo.viajes;
    }
     
    async associateViajesVehiculo(vehiculoId: string, viajes: ViajeEntity[]): Promise<VehiculoEntity> {
        const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({where: {id: vehiculoId}, relations: ["viajes"]});
     
        if (!vehiculo)
          throw new BusinessLogicException("The vehicle with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < viajes.length; i++) {
          const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajes[i].id}});
          if (!viaje)
            throw new BusinessLogicException("The journey with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        vehiculo.viajes = viajes;
        return await this.vehiculoRepository.save(vehiculo);
      }
     
    async deleteViajeVehiculo(vehiculoId: string, viajeId: string){
        const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajeId}});
        if (!viaje)
          throw new BusinessLogicException("The journey with the given id was not found", BusinessError.NOT_FOUND)
     
        const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({where: {id: vehiculoId}, relations: ["viajes"]});
        if (!vehiculo)
          throw new BusinessLogicException("The vehicle with the given id was not found", BusinessError.NOT_FOUND)
     
        const vehiculoViaje: ViajeEntity = vehiculo.viajes.find(e => e.id === viaje.id);
     
        if (!vehiculoViaje)
            throw new BusinessLogicException("The journey with the given id is not associated to the vehicle", BusinessError.PRECONDITION_FAILED)

        vehiculo.viajes = vehiculo.viajes.filter(e => e.id !== viajeId);
        await this.vehiculoRepository.save(vehiculo);
    }  
}
