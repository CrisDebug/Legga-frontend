
import { DocumentoApiDTO } from '../../../core/models/documento-api.model';

/**
 * Datos ficticios de documentos para desarrollo de LEGGA.
 *
 * Los legajoId corresponden a LEGAJOS_MOCK.
 * No se duplican nombres de categorías ni títulos de legajos.
 *
 * Los documentos asociados a legajos archivados no se utilizan
 * para simular nuevas cargas.
 */
export const DOCUMENTOS_MOCK: DocumentoApiDTO[] = [
  {
    id: 'doc-001',
    legajoId: 'legajo-001',
    nombreOriginal: 'contrato_trabajo.pdf',
    nombreVisible: 'Contrato de trabajo',
    tipoMime: 'application/pdf',
    tamanoBytes: 245760,
    estado: 'ASOCIADO',
    fechaVencimiento: null,
    uploadedAt: '2026-10-16T10:30:00',
    uploadedByNombre: 'Administrador'
  },
  {
    id: 'doc-002',
    legajoId: 'legajo-001',
    nombreOriginal: 'cedula_identidad.pdf',
    nombreVisible: 'Cédula de identidad',
    tipoMime: 'application/pdf',
    tamanoBytes: 512000,
    estado: 'ASOCIADO',
    fechaVencimiento: '2027-06-30',
    uploadedAt: '2026-10-17T11:15:00',
    uploadedByNombre: 'Administrador'
  },
  {
    id: 'doc-003',
    legajoId: 'legajo-002',
    nombreOriginal: 'contrato_servicios.pdf',
    nombreVisible: 'Contrato de prestación de servicios',
    tipoMime: 'application/pdf',
    tamanoBytes: 1048576,
    estado: 'ASOCIADO',
    fechaVencimiento: '2027-03-31',
    uploadedAt: '2026-10-13T09:45:00',
    uploadedByNombre: 'Administrador'
  },
  {
    id: 'doc-004',
    legajoId: 'legajo-002',
    nombreOriginal: 'anexo_comercial.pdf',
    nombreVisible: 'Anexo comercial',
    tipoMime: 'application/pdf',
    tamanoBytes: 385024,
    estado: 'ASOCIADO',
    fechaVencimiento: null,
    uploadedAt: '2026-10-14T14:20:00',
    uploadedByNombre: 'Administrador'
  },
  {
    id: 'doc-005',
    legajoId: 'legajo-003',
    nombreOriginal: 'balance_2026.pdf',
    nombreVisible: 'Balance financiero 2026',
    tipoMime: 'application/pdf',
    tamanoBytes: 1572864,
    estado: 'ASOCIADO',
    fechaVencimiento: null,
    uploadedAt: '2026-10-09T12:30:00',
    uploadedByNombre: 'Administrador'
  },
  {
    id: 'doc-006',
    legajoId: 'legajo-003',
    nombreOriginal: 'factura_octubre.pdf',
    nombreVisible: 'Factura octubre',
    tipoMime: 'application/pdf',
    tamanoBytes: 204800,
    estado: 'ASOCIADO',
    fechaVencimiento: '2026-11-30',
    uploadedAt: '2026-10-10T08:30:00',
    uploadedByNombre: 'Administrador'
  },
  {
    id: 'doc-007',
    legajoId: 'legajo-005',
    nombreOriginal: 'informe_proyecto.pdf',
    nombreVisible: 'Informe de proyecto',
    tipoMime: 'application/pdf',
    tamanoBytes: 786432,
    estado: 'ASOCIADO',
    fechaVencimiento: null,
    uploadedAt: '2026-09-20T15:00:00',
    uploadedByNombre: 'Administrador'
  },
  {
    id: 'doc-008',
    legajoId: 'legajo-006',
    nombreOriginal: 'resolucion_administrativa.pdf',
    nombreVisible: 'Resolución administrativa',
    tipoMime: 'application/pdf',
    tamanoBytes: 450560,
    estado: 'ASOCIADO',
    fechaVencimiento: null,
    uploadedAt: '2026-09-12T10:00:00',
    uploadedByNombre: 'Administrador'
  },
  {
    id: 'doc-009',
    legajoId: 'legajo-007',
    nombreOriginal: 'evaluacion_candidato.pdf',
    nombreVisible: 'Evaluación de candidato',
    tipoMime: 'application/pdf',
    tamanoBytes: 327680,
    estado: 'ASOCIADO',
    fechaVencimiento: null,
    uploadedAt: '2026-09-06T09:30:00',
    uploadedByNombre: 'Administrador'
  },
  {
    id: 'doc-010',
    legajoId: 'legajo-008',
    nombreOriginal: 'convenio_institucional.pdf',
    nombreVisible: 'Convenio institucional',
    tipoMime: 'application/pdf',
    tamanoBytes: 921600,
    estado: 'ASOCIADO',
    fechaVencimiento: '2027-08-31',
    uploadedAt: '2026-08-29T11:00:00',
    uploadedByNombre: 'Administrador'
  },
  {
    id: 'doc-011',
    legajoId: 'legajo-010',
    nombreOriginal: 'proyecto_infraestructura.pdf',
    nombreVisible: 'Proyecto de infraestructura',
    tipoMime: 'application/pdf',
    tamanoBytes: 2097152,
    estado: 'ASOCIADO',
    fechaVencimiento: null,
    uploadedAt: '2026-08-13T09:00:00',
    uploadedByNombre: 'Administrador'
  },
  {
    id: 'doc-012',
    legajoId: 'legajo-011',
    nombreOriginal: 'orden_compra.pdf',
    nombreVisible: 'Orden de compra',
    tipoMime: 'application/pdf',
    tamanoBytes: 286720,
    estado: 'ASOCIADO',
    fechaVencimiento: null,
    uploadedAt: '2026-08-06T13:30:00',
    uploadedByNombre: 'Administrador'
  },
  {
    id: 'doc-013',
    legajoId: 'legajo-012',
    nombreOriginal: 'anexo_contrato.pdf',
    nombreVisible: 'Anexo de contrato',
    tipoMime: 'application/pdf',
    tamanoBytes: 409600,
    estado: 'ASOCIADO',
    fechaVencimiento: '2027-01-31',
    uploadedAt: '2026-07-26T10:30:00',
    uploadedByNombre: 'Administrador'
  },
  {
    id: 'doc-014',
    legajoId: 'legajo-014',
    nombreOriginal: 'informe_gestion.pdf',
    nombreVisible: 'Informe de gestión',
    tipoMime: 'application/pdf',
    tamanoBytes: 614400,
    estado: 'DESVINCULADO',
    fechaVencimiento: null,
    uploadedAt: '2026-07-02T09:15:00',
    uploadedByNombre: 'Administrador',
    desvinculadoEn: '2026-07-30T15:30:00',
    motivoDesvinculacion: 'Documento asociado por error'
  }
];
