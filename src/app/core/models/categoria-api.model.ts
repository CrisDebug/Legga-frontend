
/**
 * Contrato público del BFF para representar una categoría.
 * Basado en Contratos Públicos BFF v1.2.
 */

export interface CategoriaApiDTO {
  id: string;
  nombre: string;
  descripcion: string | null;
  activa: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Datos enviados al BFF para crear una categoría.
 */
export interface CreateCategoriaRequest {
  nombre: string;
  descripcion?: string | null;
}

/**
 * Datos enviados al BFF para actualizar una categoría.
 */
export interface UpdateCategoriaRequest {
  nombre: string;
  descripcion?: string | null;
}
