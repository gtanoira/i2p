/// <reference types="multer" />
import { FacturaProveedor } from './factura-proveedor.schema';
import { UserAuth } from 'src/models/user-auth.model';
import { CreateFacturaProveedorDto } from '../dto/factura-proveedor.dto';
import { FacturaProveedorService } from './factura-proveedor.service';
import { FacturaProveedorOldService } from './old/factura-proveedor.service';
export declare class FacturaProveedorController {
    private facturaProveedorService;
    private facturaProveedorOldService;
    constructor(facturaProveedorService: FacturaProveedorService, facturaProveedorOldService: FacturaProveedorOldService);
    migrateFromOld(infoUser: UserAuth): Promise<{
        [key: string]: any;
    }>;
    addFactura(infoUser: UserAuth, facturaProveedorDto: CreateFacturaProveedorDto): Promise<{
        [key: string]: any;
    }>;
    addFileToFactura(infoUser: UserAuth, id: string, pdfFile: Express.Multer.File): Promise<{
        [key: string]: any;
    }>;
    getAll(infoUser: UserAuth): Promise<FacturaProveedor[]>;
    getPdfFile(infoUser: UserAuth, id: string, res: any): Promise<void>;
    private mapNewDoc;
    private savePdfFile;
    private validateNumber;
    private toLogStatus;
    private toDocStatus;
    private validateFecha;
}
