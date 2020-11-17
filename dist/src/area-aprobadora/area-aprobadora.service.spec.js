"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const area_aprobadora_service_1 = require("./area-aprobadora.service");
describe('AreaAprobadoraService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [area_aprobadora_service_1.AreaAprobadoraService],
        }).compile();
        service = module.get(area_aprobadora_service_1.AreaAprobadoraService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=area-aprobadora.service.spec.js.map