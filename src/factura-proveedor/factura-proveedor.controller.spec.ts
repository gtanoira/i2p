import { Test, TestingModule } from '@nestjs/testing';
import { FacturaProveedorController } from './factura-proveedor.controller';

describe('FacturaProveedorController', () => {
  let controller: FacturaProveedorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacturaProveedorController],
    }).compile();

    controller = module.get<FacturaProveedorController>(FacturaProveedorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
