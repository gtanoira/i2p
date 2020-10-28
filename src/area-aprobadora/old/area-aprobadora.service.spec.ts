import { Test, TestingModule } from '@nestjs/testing';
import { AreaAprobadoraService } from './area-aprobadora.service';

describe('AreaAprobadoraService', () => {
  let service: AreaAprobadoraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AreaAprobadoraService],
    }).compile();

    service = module.get<AreaAprobadoraService>(AreaAprobadoraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
