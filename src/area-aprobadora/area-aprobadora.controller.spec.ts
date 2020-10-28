import { Test, TestingModule } from '@nestjs/testing';
import { AreaAprobadoraController } from './area-aprobadora.controller';

describe('AreaAprobadoraController', () => {
  let controller: AreaAprobadoraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AreaAprobadoraController],
    }).compile();

    controller = module.get<AreaAprobadoraController>(AreaAprobadoraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
