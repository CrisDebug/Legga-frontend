
/**
 * Modelo de dominio del frontend para representar un usuario de LEGGA.
 * Basado en el diccionario de datos consolidado.
 */

export interface Usuario {
  /** Identificador UUID interno del usuario. */
  id: string;

  /** Identificador del tenant de Microsoft Entra. */
  entra_tenant_id: string;

  /** Identificador del objeto de usuario en Entra. */
  entra_object_id: string;

  /** Correo electrónico del usuario. */
  correo: string;

  /** Nombre del usuario. */
  nombre: string;

  /** Perfil asignado. Puede no existir todavía. */
  perfil_id: string | null;

  /** Indica si el usuario está habilitado en LEGGA. */
  activo: boolean;

  /** Fecha de creación. */
  created_at: string;

  /** Fecha de última actualización. */
  updated_at: string;
}
