"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneFileMemoryMulterOptions = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
exports.oneFileMemoryMulterOptions = {
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/pdf$/)) {
            cb(null, true);
        }
        else {
            cb(new common_1.BadRequestException(`API-0047(E): Solo se aceptan archivos PDFs.`), false);
        }
    },
    storage: multer_1.memoryStorage()
};
//# sourceMappingURL=one-file-opts.multer.js.map