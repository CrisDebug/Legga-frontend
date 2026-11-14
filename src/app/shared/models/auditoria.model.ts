
/**
 * Modelo de auditoría de LEGGA.
 * Basado en la estructura consolidada de auditoria_db.
 */

export interface EventoAuditoria {
  /** Identificador numérico del registro de auditoría. */
  id: number;

  /** Identificador único del evento recibido. */
  event_id: string;

  /** Identificador del actor en el sistema legado, si existe. */
  actor_id: string | null;

  /** Identificador UUID del usuario LEGGA, ampliación objetivo. */
  actor_user_id?: string | null;

  /** Tenant de Microsoft Entra, ampliación objetivo. */
  actor_entra_tenant_id?: string | null;

  /** Object ID de Microsoft Entra, ampliación objetivo. */
  actor_entra_object_id?: string | null;

  /** Acción realizada. */
  accion: string;

  /** Tipo de entidad afectada. */
  entidad: string | null;

  /** Identificador de la entidad afectada. */
  entidad_id: string | null;

  /** Resultado de la operación. */
  resultado: string | null;

  /** Fecha y hora del evento. */
  fecha_hora: string;

  /** Identificador para correlacionar operaciones. */
  correlation_id: string | null;

  /** Metadatos adicionales. */
  metadata: Record<string, unknown> | null;

  /** Evento original recibido. */
  evento_original: Record<string, unknown> | null;

  /** Fecha de registro de auditoría. */
  creado_en: string;
}
