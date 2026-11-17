
/**
 * Contrato público del BFF para representar un legajo.
 * Fuente: Contratos Públicos BFF DTOs v1.2.
 *
 * Este modelo representa la respuesta de la API.
 * No reemplaza el modelo de dominio de shared/models.
 */

export type LegajoApiEstado = 'ACTIVO' | 'ARCHIVADO';

export interface LegajoApiDTO {
  id: string;
  titulo: string;
  descripcion: string | null;
  categoriaId: string;
  categoriaNombre: string;
  estado: LegajoApiEstado;
  creadoPorNombre?: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Datos que el frontend envía al BFF para crear un legajo.
 */
export interface CreateLegajoRequest {
  titulo: string;
  descripcion?: string | null;
  categoriaId: string;
}

/**
 * Datos que el frontend envía al BFF para actualizar un legajo.
 */
export interface UpdateLegajoRequest {
  titulo: string;
  descripcion?: string | null;
  categoriaId: string;
}
