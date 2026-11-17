/**
 * Modelo público de historial de LEGGA.
 *
 * Representa un evento de auditoría registrado por el backend.
 * Basado en HistorialItemDTO del contrato BFF v1.2.
 *
 * Este modelo no representa las entidades internas de PostgreSQL.
 */
export interface HistorialItemApiDTO {

  // Identificador único del evento.
  eventId: string;

  // Identificador del legajo afectado.
  legajoId: string;

  // Fecha y hora en formato ISO 8601.
  fechaHora: string;

  // Usuario que realizó la operación.
  actorUserId: string | null;

  // Nombre visible del usuario.
  actorNombre: string | null;

  // Acción realizada.
  accion: string;

  // Tipo de entidad afectada.
  entidad: string | null;

  // Identificador de la entidad afectada.
  entidadId: string | null;

  // Resultado de la operación.
  resultado: string | null;

  // Descripción del evento.
  descripcion: string;

  // Identificador opcional para correlacionar operaciones.
  correlationId?: string | null;
}