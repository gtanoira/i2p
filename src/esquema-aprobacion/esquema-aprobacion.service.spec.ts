import { Test, TestingModule } from '@nestjs/testing';
import { EsquemaAprobacionService } from './esquema-aprobacion.service';

describe('EsquemaAprobacionService', () => {
  let service: EsquemaAprobacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EsquemaAprobacionService],
    }).compile();

    service = module.get<EsquemaAprobacionService>(EsquemaAprobacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
