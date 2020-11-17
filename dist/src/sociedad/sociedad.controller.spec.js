"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sociedad_controller_1 = require("./sociedad.controller");
describe('SociedadController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [sociedad_controller_1.SociedadController],
        }).compile();
        controller = module.get(sociedad_controller_1.SociedadController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=sociedad.controller.spec.js.map