"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const authorizations_service_1 = require("./authorizations.service");
describe('AuthorizationsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [authorizations_service_1.AuthorizationsService],
        }).compile();
        service = module.get(authorizations_service_1.AuthorizationsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=authorizations.service.spec.js.map