
/**
 * Contratos públicos de completitud documental LEGGA.
 *
 * Fuente: LEGGA - Contratos Públicos BFF y DTOs v1.2.
 *
 * F-09: Verificar completitud documental.
 *
 * Estos modelos representan los DTO públicos que consume Angular.
 * No incorporan estructuras internas de base de datos.
 */

/**
 * Documento asociado a un requisito documental.
 */
export interface DocumentoRequisitoDTO {
  documentoId: string;
  nombreVisible: string;
}

/**
 * Estado individual de un requisito documental.
 */
export interface RequisitoDocumentalEstadoDTO {
  requisitoId: string;
  codigo: string;
  nombre: string;
  obligatorio: boolean;
  cumplido: boolean;
  cantidadDocumentosValidos: number;
  documentos: DocumentoRequisitoDTO[];
}

/**
 * Resumen de completitud documental de un legajo.
 */
export interface ResumenDocumentalDTO {
  totalRequisitos: number;
  requisitosCumplidos: number;
  requisitosPendientes: number;
  porcentajeCompletitud: number;
  completo: boolean;
}

/**
 * Resultado de la consulta de completitud documental.
 *
 * Contrato BFF:
 * GET /api/v1/legajos/{legajoId}/completitud
 */
export interface CompletitudLegajoDTO {
  legajoId: string;
  resumen: ResumenDocumentalDTO;
  requisitos: RequisitoDocumentalEstadoDTO[];
  calculadoEn: string;
}
