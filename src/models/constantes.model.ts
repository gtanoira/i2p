/* // DocStatus: indica en qué proceso se encuentra la factura del proveedor
export enum DocStatus {
  EN_CARGA = 'enCarga',
  EN_APROBACION = 'enAprobacion',
  EN_SAP = 'enSap',
  FINALIZADA = 'finalizada',
  ANULADA = 'anulada'
};

// LogFacturaStatus
export enum LogFacturaStatus {
  CREADA = 'creada',
  MODIFICADA = 'modificada',
  APROBADA = 'aprobada',
  RECHAZADA = 'rechazada',
  ENVIADA_SAP = 'enviadaASap',
  FINALIZADA = 'finalizada',
  ANULADA = 'anulada'
} */

// DocStatus: indica en qué proceso se encuentra la factura del proveedor
export const DocStatus = [
  'EN_CARGA',
  'EN_APROBACION',
  'EN_SAP',
  'FINALIZADA',
  'ANULADA'
];

// LogFacturaStatus
export const LogFacturaStatus  = [
  'CREADA',
  'MODIFICADA',
  'APROBADA',
  'RECHAZADA',
  'ENVIADA_SAP',
  'FINALIZADA',
  'ANULADA'
];
