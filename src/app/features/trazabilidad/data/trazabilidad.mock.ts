
import { HistorialItemApiDTO } from '../../../core/models/historial-item-api.model';

/**
 * Mock demostrativo de trazabilidad LEGGA.
 *
 * Representa eventos de auditoría para desarrollar la interfaz.
 * Los registros son ficticios y no representan auditoría real.
 *
 * Los nombres de propiedades respetan HistorialItemDTO del BFF.
 */
export const TRAZABILIDAD_MOCK: HistorialItemApiDTO[] = [

  // =====================================================
  // 1. CREACIÓN DE LEGAJO
  // =====================================================
  {
    eventId: 'evt-001',
    legajoId: 'legajo-001',
    fechaHora: '2026-11-16T10:42:00-03:00',
    actorUserId: 'usr-001',
    actorNombre: 'María González',
    accion: 'CREACION_LEGAJO',
    entidad: 'Legajo',
    entidadId: 'legajo-001',
    resultado: 'EXITOSO',
    descripcion: 'Creó el legajo Documentación de Recursos Humanos.'
  },

  // =====================================================
  // 2. ASOCIACIÓN DE DOCUMENTO
  // =====================================================
  {
    eventId: 'evt-002',
    legajoId: 'legajo-002',
    fechaHora: '2026-11-16T10:18:00-03:00',
    actorUserId: 'usr-002',
    actorNombre: 'Carlos Pérez',
    accion: 'ASOCIACION_DOCUMENTO',
    entidad: 'Documento',
    entidadId: 'doc-legajo-002-01',
    resultado: 'EXITOSO',
    descripcion: 'Adjuntó el documento Contrato de prestación de servicios.'
  },

  // =====================================================
  // 3. MODIFICACIÓN DE DATOS DEL LEGAJO
  // =====================================================
  {
    eventId: 'evt-003',
    legajoId: 'legajo-003',
    fechaHora: '2026-11-15T16:35:00-03:00',
    actorUserId: 'usr-001',
    actorNombre: 'María González',
    accion: 'MODIFICACION_LEGAJO',
    entidad: 'Legajo',
    entidadId: 'legajo-003',
    resultado: 'EXITOSO',
    descripcion: 'Modificó datos del legajo Documentación financiera 2026.'
  },

  // =====================================================
  // 4. DESVINCULACIÓN DE DOCUMENTO
  // =====================================================
  {
    eventId: 'evt-004',
    legajoId: 'legajo-001',
    fechaHora: '2026-11-15T14:12:00-03:00',
    actorUserId: 'usr-003',
    actorNombre: 'Ana Soto',
    accion: 'DESVINCULACION_DOCUMENTO',
    entidad: 'Documento',
    entidadId: 'doc-legajo-001-02',
    resultado: 'EXITOSO',
    descripcion: 'Desvinculó un documento del legajo Documentación de Recursos Humanos.'
  },

  // =====================================================
  // 5. CAMBIO DE CATEGORÍA
  // =====================================================
  {
    eventId: 'evt-005',
    legajoId: 'legajo-004',
    fechaHora: '2026-11-14T11:20:00-03:00',
    actorUserId: 'usr-001',
    actorNombre: 'María González',
    accion: 'CAMBIO_CATEGORIA',
    entidad: 'Categoria',
    entidadId: 'categoria-002',
    resultado: 'EXITOSO',
    descripcion: 'Actualizó la categoría asociada al legajo.'
  },

  // =====================================================
  // 6. CAMBIO DE PERFIL
  // =====================================================
  {
    eventId: 'evt-006',
    legajoId: 'legajo-005',
    fechaHora: '2026-11-13T09:45:00-03:00',
    actorUserId: 'usr-004',
    actorNombre: 'Pedro Ramírez',
    accion: 'CAMBIO_PERFIL',
    entidad: 'Perfil',
    entidadId: 'perfil-002',
    resultado: 'EXITOSO',
    descripcion: 'Actualizó el perfil de acceso de un usuario.'
  },

  // =====================================================
  // 7. RESULTADO FALLIDO DEMOSTRATIVO
  // =====================================================
  {
    eventId: 'evt-007',
    legajoId: 'legajo-002',
    fechaHora: '2026-11-12T15:30:00-03:00',
    actorUserId: 'usr-002',
    actorNombre: 'Carlos Pérez',
    accion: 'ASOCIACION_DOCUMENTO',
    entidad: 'Documento',
    entidadId: 'doc-legajo-002-02',
    resultado: 'FALLIDO',
    descripcion: 'No fue posible asociar el documento al legajo.'
  }
];
