
/**
 * Modelo de dominio del frontend para representar un perfil.
 * Basado en el diccionario de datos consolidado de LEGGA.
 */

export interface Perfil {
  /** Identificador UUID del perfil. */
  id: string;

  /** Código único del perfil. */
  codigo: string;

  /** Nombre visible del perfil. */
  nombre: string;

  /** Descripción opcional. */
  descripcion: string | null;

  /** Indica si el perfil está habilitado. */
  activo: boolean;

  /** Fecha de creación. */
  created_at: string;

  /** Fecha de última actualización. */
  updated_at: string;
}
