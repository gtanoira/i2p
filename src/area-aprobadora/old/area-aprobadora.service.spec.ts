import { Test, TestingModule } from '@nestjs/testing';
import { AreaAprobadoraOldService } from './area-aprobadora.service';

describe('AreaAprobadoraService', () => {
  let service: AreaAprobadoraOldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AreaAprobadoraOldService],
    }).compile();

    service = module.get<AreaAprobadoraOldService>(AreaAprobadoraOldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
