import { Test, TestingModule } from '@nestjs/testing';
import { SociedadService } from './sociedad.service';

describe('SociedadService', () => {
  let service: SociedadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SociedadService],
    }).compile();

    service = module.get<SociedadService>(SociedadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
