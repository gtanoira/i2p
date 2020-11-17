import { Document, Types } from 'mongoose';
declare class DetalleFactura {
    linenumber?: string;
    costcenter?: string;
    accountcode?: string;
    amount_item?: string | null;
    tax_percentage?: string;
    tax_amount?: string;
    order?: string;
    concept?: string;
    servicemonth?: string;
    description?: string;
}
declare class ImpuestoFactura {
    taxcode?: string;
    taxamount?: string;
    regulartax?: string;
}
declare class LogFactura {
    update_date?: string;
    action: string;
    description: string;
}
export declare type FacturaProveedorOldDocument = FacturaProveedorOld & Document;
export declare class FacturaProveedorOld {
    _id: Types.ObjectId;
    maxdatetorelease?: Date;
    supplier: string;
    approvalarea?: string;
    company: string;
    accountingdate?: string | null;
    documentdate?: string | null;
    documenttype: string;
    documentnumber?: string | null;
    currency: string;
    netamountinvoice?: string;
    totaltax?: string;
    totalinvoice?: string;
    approver_total?: string;
    aplevel?: string;
    approver1?: string;
    approver1date?: string;
    approver1user?: string;
    release1?: string;
    approver2?: string;
    approver2date?: string;
    approver2user?: string;
    release2?: string;
    approver3?: string;
    approver3date?: string;
    approver3user?: string;
    release3?: string;
    approver4?: string;
    approver4date?: string;
    approver4user?: string;
    release4?: string;
    approver5?: string;
    approver5date?: string;
    approver5user?: string;
    release5?: string;
    createdby?: string;
    exchangerate?: string;
    sap_id?: string;
    sap_status?: string;
    sap_date?: string;
    createddate?: Date;
    general_log?: LogFactura[];
    detail?: DetalleFactura[];
    detailtax?: ImpuestoFactura[];
}
export declare const FacturaProveedorOldSchema: import("mongoose").Schema<any>;
export {};
