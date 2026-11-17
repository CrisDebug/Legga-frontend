
/**
 * Contrato público de paginación del BFF.
 * Basado en Contratos Públicos BFF v1.2.
 *
 * page utiliza índice base cero.
 */

export interface PageApiDTO<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
