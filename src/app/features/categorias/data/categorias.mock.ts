
import { CategoriaApiDTO } from '../../../core/models/categoria-api.model';

/**
 * Catálogo único de categorías de LEGGA.
 *
 * Fuente temporal compartida por las distintas funcionalidades.
 * Los identificadores se mantienen compatibles con las rutas
 * existentes del mantenedor de categorías.
 */
export const CATEGORIAS_MOCK: CategoriaApiDTO[] = [
  {
    id: '1',
    nombre: 'Recursos Humanos',
    descripcion: 'Gestión de antecedentes y documentación del personal.',
    activa: true,
    createdAt: '2026-10-01T09:00:00',
    updatedAt: '2026-10-01T09:00:00'
  },
  {
    id: '2',
    nombre: 'Finanzas',
    descripcion: 'Administración de documentos financieros y contables.',
    activa: true,
    createdAt: '2026-10-01T09:00:00',
    updatedAt: '2026-10-01T09:00:00'
  },
  {
    id: '3',
    nombre: 'Proveedores',
    descripcion: 'Registro y gestión de información de proveedores.',
    activa: true,
    createdAt: '2026-10-01T09:00:00',
    updatedAt: '2026-10-01T09:00:00'
  },
  {
    id: '4',
    nombre: 'Contratos',
    descripcion: 'Organización y administración de contratos.',
    activa: true,
    createdAt: '2026-10-01T09:00:00',
    updatedAt: '2026-10-01T09:00:00'
  }
];
