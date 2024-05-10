import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioViajeService } from './usuario-viaje.service';

describe('UsuarioViajeService', () => {
  let service: UsuarioViajeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioViajeService],
    }).compile();

    service = module.get<UsuarioViajeService>(UsuarioViajeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
