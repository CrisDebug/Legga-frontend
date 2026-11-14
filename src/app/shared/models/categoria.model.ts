
/**
 * Modelo de dominio del frontend para representar una categoría.
 * Basado en el diccionario de datos consolidado de LEGGA.
 */

export interface Categoria {
  /** Identificador UUID de la categoría. */
  id: string;

  /** Nombre de la categoría. Máximo 100 caracteres. */
  nombre: string;

  /** Descripción opcional. Máximo 255 caracteres. */
  descripcion: string | null;

  /** Indica si la categoría está habilitada. */
  activa: boolean;

  /** Fecha de creación. */
  created_at: string;

  /** Fecha de última actualización. */
  updated_at: string;
}
