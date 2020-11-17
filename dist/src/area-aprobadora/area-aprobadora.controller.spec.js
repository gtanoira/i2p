"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const area_aprobadora_controller_1 = require("./area-aprobadora.controller");
describe('AreaAprobadoraController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [area_aprobadora_controller_1.AreaAprobadoraController],
        }).compile();
        controller = module.get(area_aprobadora_controller_1.AreaAprobadoraController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=area-aprobadora.controller.spec.js.map