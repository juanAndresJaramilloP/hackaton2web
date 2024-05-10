import { Test, TestingModule } from '@nestjs/testing';
import { VehiculoViajeService } from './vehiculo-viaje.service';

describe('VehiculoViajeService', () => {
  let service: VehiculoViajeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiculoViajeService],
    }).compile();

    service = module.get<VehiculoViajeService>(VehiculoViajeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
