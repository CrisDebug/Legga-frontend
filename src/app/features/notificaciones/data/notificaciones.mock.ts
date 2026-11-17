
import {
  NotificacionApiDTO
} from '../../../core/models/notificacion-api.model';

/**
 * =====================================================
 * MOCK NOTIFICACIONES - F-12
 * =====================================================
 *
 * Datos exclusivamente demostrativos para desarrollar
 * la bandeja de notificaciones de LEGGA.
 *
 * Escenarios contemplados por el catálogo:
 *
 * 1. Legajo pasa a estado incompleto.
 * 2. Legajo alcanza la completitud documental.
 * 3. Documento entra en ventana de 30 días para vencer.
 * 4. Documento vence.
 *
 * Los estados de lectura son individuales por destinatario.
 * En producción serán obtenidos desde el BFF.
 *
 * IMPORTANTE:
 * Estos registros no representan eventos reales ni
 * generan notificaciones automáticamente.
 */

export const NOTIFICACIONES_MOCK: NotificacionApiDTO[] = [

  // ===================================================
  // COMPLETITUD DOCUMENTAL
  // ===================================================

  {
    id: 'notif-001',
    tipo: 'COMPLETITUD_INCOMPLETA',
    titulo: 'Legajo con documentación pendiente',
    mensaje:
      'El legajo LEG-001 presenta requisitos documentales obligatorios pendientes.',
    entidadTipo: 'LEGAJO',
    entidadId: 'legajo-001',
    creadaEn: '2026-11-16T09:15:00-03:00',
    estadoLectura: 'NO_LEIDA',
    leidaEn: null,
    metadata: {
      categoria: 'COMPLETITUD',
      legajoCodigo: 'LEG-001',
      porcentajeCompletitud: 67
    }
  },
  {
    id: 'notif-002',
    tipo: 'COMPLETITUD_COMPLETA',
    titulo: 'Legajo con documentación completa',
    mensaje:
      'El legajo LEG-002 alcanzó el cumplimiento de sus requisitos documentales obligatorios.',
    entidadTipo: 'LEGAJO',
    entidadId: 'legajo-002',
    creadaEn: '2026-11-15T16:40:00-03:00',
    estadoLectura: 'LEIDA',
    leidaEn: '2026-11-15T17:05:00-03:00',
    metadata: {
      categoria: 'COMPLETITUD',
      legajoCodigo: 'LEG-002',
      porcentajeCompletitud: 100
    }
  },
  {
    id: 'notif-003',
    tipo: 'COMPLETITUD_INCOMPLETA',
    titulo: 'Documentación incompleta',
    mensaje:
      'El legajo LEG-003 tiene requisitos obligatorios que requieren atención.',
    entidadTipo: 'LEGAJO',
    entidadId: 'legajo-003',
    creadaEn: '2026-11-14T11:20:00-03:00',
    estadoLectura: 'NO_LEIDA',
    leidaEn: null,
    metadata: {
      categoria: 'COMPLETITUD',
      legajoCodigo: 'LEG-003',
      porcentajeCompletitud: 67
    }
  },

  // ===================================================
  // DOCUMENTOS PRÓXIMOS A VENCER
  // ===================================================

  {
    id: 'notif-004',
    tipo: 'DOCUMENTO_POR_VENCER',
    titulo: 'Documento próximo a vencer',
    mensaje:
      'El documento asociado al legajo LEG-003 se encuentra dentro de la ventana de alerta de vencimiento.',
    entidadTipo: 'DOCUMENTO',
    entidadId: 'doc-006',
    creadaEn: '2026-11-01T08:30:00-03:00',
    estadoLectura: 'NO_LEIDA',
    leidaEn: null,
    metadata: {
      categoria: 'VENCIMIENTO',
      legajoId: 'legajo-003',
      documentoNombre: 'Factura octubre',
      fechaVencimiento: '2026-11-30'
    }
  },

  // ===================================================
  // DOCUMENTOS VENCIDOS
  // ===================================================

  {
    id: 'notif-005',
    tipo: 'DOCUMENTO_VENCIDO',
    titulo: 'Documento vencido',
    mensaje:
      'El documento asociado al legajo LEG-005 ha alcanzado su fecha de vencimiento.',
    entidadTipo: 'DOCUMENTO',
    entidadId: 'doc-007',
    creadaEn: '2026-11-16T08:00:00-03:00',
    estadoLectura: 'LEIDA',
    leidaEn: '2026-11-16T09:10:00-03:00',
    metadata: {
      categoria: 'VENCIMIENTO',
      legajoId: 'legajo-005',
      documentoNombre: 'Informe de proyecto',
      fechaVencimiento: '2026-11-15'
    }
  }
];
