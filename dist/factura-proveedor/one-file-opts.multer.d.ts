/// <reference types="multer" />
export declare const oneFileMemoryMulterOptions: {
    fileFilter: (req: any, file: any, cb: any) => void;
    storage: import("multer").StorageEngine;
};
