import { BadRequestException } from "@nestjs/common";
import { memoryStorage } from "multer";

// Multer upload options
export const oneFileMemoryMulterOptions = {
  // Enable file size limits
  /* limits: {
      fileSize: +process.env.MAX_FILE_SIZE,
  }, */
  // Chequear los mimetype permitidos de los archivos para upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/pdf$/)) {
      // Grabar el archivo
      cb(null, true);
    } else {
      // Rechazar archivo
      cb(new BadRequestException(`API-0047(E): Solo se aceptan archivos PDFs.`), false);
    }
  },
  // Storage properties
  storage: memoryStorage()
};