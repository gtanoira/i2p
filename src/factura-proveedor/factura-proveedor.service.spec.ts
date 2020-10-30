import { Test, TestingModule } from '@nestjs/testing';
import { FacturaProveedorService } from './factura-proveedor.service';

describe('FacturaProveedorService', () => {
  let service: FacturaProveedorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacturaProveedorService],
    }).compile();

    service = module.get<FacturaProveedorService>(FacturaProveedorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
