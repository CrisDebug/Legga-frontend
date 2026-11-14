
/**
 * Modelos de notificaciones de LEGGA.
 * Basados en el diccionario de datos consolidado.
 */

export interface Notificacion {
  /** Identificador UUID de la notificación. */
  id: string;

  /** Tipo de notificación. */
  tipo: string;

  /** Título visible. */
  titulo: string;

  /** Contenido del mensaje. */
  mensaje: string;

  /** Tipo de entidad relacionada, si existe. */
  entidad_tipo: string | null;

  /** Identificador de la entidad relacionada, si existe. */
  entidad_id: string | null;

  /** Clave para evitar notificaciones duplicadas. */
  idempotency_key: string | null;

  /** Información adicional. */
  metadata: Record<string, unknown> | null;

  /** Fecha de creación. */
  creada_en: string;
}

/** Estado de lectura de una notificación para un destinatario. */
export type EstadoLecturaNotificacion = 'NO_LEIDA' | 'LEIDA';

/**
 * Relación entre una notificación y su destinatario.
 */
export interface NotificacionDestinatario {
  id: string;
  notificacion_id: string;
  usuario_id: string;
  estado_lectura: EstadoLecturaNotificacion;
  leida_en: string | null;
  creada_en: string;
}
