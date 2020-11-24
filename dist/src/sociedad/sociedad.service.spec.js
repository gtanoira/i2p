"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sociedad_service_1 = require("./sociedad.service");
describe('SociedadService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [sociedad_service_1.SociedadService],
        }).compile();
        service = module.get(sociedad_service_1.SociedadService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=sociedad.service.spec.js.map