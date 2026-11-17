
/**
 * =====================================================
 * MODELO API - NOTIFICACIONES (F-12)
 * =====================================================
 *
 * Representa el contrato público entre Angular y el BFF.
 * No representa directamente las tablas de PostgreSQL.
 *
 * Tabla principal:
 *   legajos.notificacion
 *
 * Tabla de destinatarios:
 *   legajos.notificacion_destinatario
 */

// Estados de lectura definidos en el contrato BFF.
export type EstadoLectura = 'NO_LEIDA' | 'LEIDA';

/**
 * DTO público de una notificación.
 *
 * Los datos de lectura corresponden al destinatario
 * asociado al usuario autenticado.
 */
export interface NotificacionApiDTO {
  id: string;
  tipo: string;
  titulo: string;
  mensaje: string;
  entidadTipo: string | null;
  entidadId: string | null;
  creadaEn: string;
  estadoLectura: EstadoLectura;
  leidaEn: string | null;
  metadata?: Record<string, unknown> | null;
}

/**
 * Solicitud para marcar una notificación como leída.
 *
 * Endpoint propuesto:
 * PATCH /api/v1/me/notificaciones/{notificacionId}/lectura
 */
export interface MarcarLeidaRequest {
  leida: true;
}
