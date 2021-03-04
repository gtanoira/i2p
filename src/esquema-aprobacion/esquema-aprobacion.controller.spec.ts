import { Test, TestingModule } from '@nestjs/testing';
import { EsquemaAprobacionController } from './esquema-aprobacion.controller';

describe('EsquemaAprobacionController', () => {
  let controller: EsquemaAprobacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EsquemaAprobacionController],
    }).compile();

    controller = module.get<EsquemaAprobacionController>(EsquemaAprobacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
