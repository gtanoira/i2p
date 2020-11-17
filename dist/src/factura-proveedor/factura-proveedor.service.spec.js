"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const factura_proveedor_service_1 = require("./factura-proveedor.service");
describe('FacturaProveedorService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [factura_proveedor_service_1.FacturaProveedorService],
        }).compile();
        service = module.get(factura_proveedor_service_1.FacturaProveedorService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=factura-proveedor.service.spec.js.map