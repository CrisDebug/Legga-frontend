
import { LegajoApiDTO } from '../../../core/models/legajo-api.model';

/**
 * Datos ficticios para desarrollar y probar LEGGA.
 *
 * Los categoriaId corresponden al catálogo único
 * definido en features/categorias/data/categorias.mock.ts.
 */
export const LEGAJOS_MOCK: LegajoApiDTO[] = [
  {
    id: 'legajo-001',
    titulo: 'Documentación de Recursos Humanos',
    descripcion: 'Antecedentes y documentación del área de Recursos Humanos.',
    categoriaId: '1',
    categoriaNombre: 'Recursos Humanos',
    estado: 'ACTIVO',
    creadoPorNombre: 'Administrador',
    createdAt: '2026-10-15T10:30:00',
    updatedAt: '2026-10-20T14:15:00'
  },
  {
    id: 'legajo-002',
    titulo: 'Contratos de prestación de servicios',
    descripcion: 'Contratos y antecedentes de proveedores.',
    categoriaId: '4',
    categoriaNombre: 'Contratos',
    estado: 'ACTIVO',
    creadoPorNombre: 'Administrador',
    createdAt: '2026-10-12T09:00:00',
    updatedAt: '2026-10-18T11:20:00'
  },
  {
    id: 'legajo-003',
    titulo: 'Documentación financiera 2026',
    descripcion: 'Documentos financieros y respaldos del período.',
    categoriaId: '2',
    categoriaNombre: 'Finanzas',
    estado: 'ACTIVO',
    creadoPorNombre: 'Administrador',
    createdAt: '2026-10-08T12:00:00',
    updatedAt: '2026-10-16T16:40:00'
  },
  {
    id: 'legajo-004',
    titulo: 'Antecedentes de proveedores',
    descripcion: 'Documentación administrativa de proveedores.',
    categoriaId: '3',
    categoriaNombre: 'Proveedores',
    estado: 'ARCHIVADO',
    creadoPorNombre: 'Administrador',
    createdAt: '2026-09-22T08:45:00',
    updatedAt: '2026-10-01T13:10:00'
  },
  {
    id: 'legajo-005',
    titulo: 'Documentación de proyectos',
    descripcion: 'Antecedentes y documentación de proyectos internos.',
    categoriaId: '3',
    categoriaNombre: 'Proveedores',
    estado: 'ACTIVO',
    creadoPorNombre: 'Administrador',
    createdAt: '2026-09-18T15:30:00',
    updatedAt: '2026-10-10T10:00:00'
  },
  {
    id: 'legajo-006',
    titulo: 'Registros administrativos',
    descripcion: 'Documentación general de gestión administrativa.',
    categoriaId: '2',
    categoriaNombre: 'Finanzas',
    estado: 'ACTIVO',
    creadoPorNombre: 'Administrador',
    createdAt: '2026-09-10T11:15:00',
    updatedAt: '2026-10-05T09:30:00'
  },
  {
    id: 'legajo-007',
    titulo: 'Expedientes de selección de personal',
    descripcion: 'Antecedentes de procesos de selección.',
    categoriaId: '1',
    categoriaNombre: 'Recursos Humanos',
    estado: 'ACTIVO',
    creadoPorNombre: 'Administrador',
    createdAt: '2026-09-05T09:00:00',
    updatedAt: '2026-10-02T12:00:00'
  },
  {
    id: 'legajo-008',
    titulo: 'Convenios institucionales',
    descripcion: 'Convenios y acuerdos con instituciones.',
    categoriaId: '4',
    categoriaNombre: 'Contratos',
    estado: 'ACTIVO',
    creadoPorNombre: 'Administrador',
    createdAt: '2026-08-28T10:00:00',
    updatedAt: '2026-09-25T15:30:00'
  },
  {
    id: 'legajo-009',
    titulo: 'Informes presupuestarios',
    descripcion: 'Informes de presupuesto y ejecución financiera.',
    categoriaId: '2',
    categoriaNombre: 'Finanzas',
    estado: 'ARCHIVADO',
    creadoPorNombre: 'Administrador',
    createdAt: '2026-08-20T11:00:00',
    updatedAt: '2026-09-15T14:00:00'
  },
  {
    id: 'legajo-010',
    titulo: 'Proyectos de infraestructura',
    descripcion: 'Antecedentes de proyectos de infraestructura.',
    categoriaId: '3',
    categoriaNombre: 'Proveedores',
    estado: 'ACTIVO',
    creadoPorNombre: 'Administrador',
    createdAt: '2026-08-12T08:30:00',
    updatedAt: '2026-09-10T10:20:00'
  },
  {
    id: 'legajo-011',
    titulo: 'Documentación de compras',
    descripcion: 'Antecedentes de procesos de adquisición.',
    categoriaId: '3',
    categoriaNombre: 'Proveedores',
    estado: 'ACTIVO',
    creadoPorNombre: 'Administrador',
    createdAt: '2026-08-05T13:00:00',
    updatedAt: '2026-09-01T16:00:00'
  },
  {
    id: 'legajo-012',
    titulo: 'Anexos contractuales',
    descripcion: 'Anexos y modificaciones contractuales.',
    categoriaId: '4',
    categoriaNombre: 'Contratos',
    estado: 'ACTIVO',
    creadoPorNombre: 'Administrador',
    createdAt: '2026-07-25T09:30:00',
    updatedAt: '2026-08-20T11:45:00'
  },
  {
    id: 'legajo-013',
    titulo: 'Evaluaciones de desempeño',
    descripcion: 'Registros de evaluación del personal.',
    categoriaId: '1',
    categoriaNombre: 'Recursos Humanos',
    estado: 'ARCHIVADO',
    creadoPorNombre: 'Administrador',
    createdAt: '2026-07-15T10:00:00',
    updatedAt: '2026-08-05T12:30:00'
  },
  {
    id: 'legajo-014',
    titulo: 'Informes de gestión de proyectos',
    descripcion: 'Informes de seguimiento y resultados.',
    categoriaId: '3',
    categoriaNombre: 'Proveedores',
    estado: 'ACTIVO',
    creadoPorNombre: 'Administrador',
    createdAt: '2026-07-01T08:45:00',
    updatedAt: '2026-07-30T15:15:00'
  }
];
