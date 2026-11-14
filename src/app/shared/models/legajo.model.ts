
/**
 * Modelo de dominio del frontend para representar un legajo.
 * Basado en el diccionario de datos consolidado de LEGGA.
 */

export type LegajoEstado = 'ACTIVO' | 'ARCHIVADO';

export interface Legajo {
  /** Identificador UUID generado por el backend. */
  id: string;

  /** Título del legajo. Máximo 150 caracteres. */
  titulo: string;

  /** Descripción opcional. Máximo 500 caracteres. */
  descripcion: string | null;

  /** Identificador UUID de la categoría asociada. */
  categoria_id: string;

  /** Estado actual del ciclo de vida. */
  estado: LegajoEstado;

  /** Identificador del usuario que creó el legajo. */
  creado_por: string;

  /** Fecha de creación. */
  created_at: string;

  /** Fecha de última actualización. */
  updated_at: string;
}
