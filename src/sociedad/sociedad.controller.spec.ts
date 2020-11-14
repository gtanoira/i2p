import { Test, TestingModule } from '@nestjs/testing';
import { SociedadController } from './sociedad.controller';

describe('SociedadController', () => {
  let controller: SociedadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SociedadController],
    }).compile();

    controller = module.get<SociedadController>(SociedadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
