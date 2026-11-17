
/**
 * Contrato público para las respuestas de error del BFF.
 * Basado en Contratos Públicos BFF v1.2.
 */

export interface ApiErrorDetailDTO {
  field?: string;
  code?: string;
  message: string;
}

export interface ApiErrorDTO {
  timestamp: string;
  status: number;
  code: string;
  message: string;
  path: string;
  correlationId: string;
  details?: ApiErrorDetailDTO[];
}
