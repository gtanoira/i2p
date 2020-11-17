"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const factura_proveedor_controller_1 = require("./factura-proveedor.controller");
describe('FacturaProveedorController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [factura_proveedor_controller_1.FacturaProveedorController],
        }).compile();
        controller = module.get(factura_proveedor_controller_1.FacturaProveedorController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=factura-proveedor.controller.spec.js.map