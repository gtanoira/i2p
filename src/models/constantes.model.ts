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
  'CREADA', 
  'MODIFICADA',
  'EN_PROCESO',
  'RECHAZADA',
  'APROBADA',
  'ENVIADA_SAP',
  'FINALIZADA',
  'ANULADA'
];

/*
  CREADA: significa que la factura fur dada de alta, pero NO empezó el circuito de aprobación.
  MODIFACADA: significa que la factura fue modificada luego de ser rechazada por algún aprobador
  EN_PROCESO: significa que la factura está en el proceso de aprobación/es (puede ser 1 o mas aprobaciones)
  RECHAZADA: significa que la factura fue rechazada y volvío para ser modificada
  APROBADA: significa que el último aprobador la aprobó u está lista para ser enviada a SAP
  ENVIADA_SAP: significa que la factura fué enviada a SAP y el SAP la aceptó.
  FINALIZADA: ???? revisar este estado junto con ENVIADA_SAP.
  ANULADA: significa que alguién anuló la factura y quedó fuera de todo circuito.
*/
