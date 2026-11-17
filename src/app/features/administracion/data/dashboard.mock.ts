
import { DashboardData } from '../models/dashboard.model';

/**
 * Datos ficticios del Dashboard.
 * Fuente temporal hasta integrar las consultas GraphQL del BFF.
 */
export const DASHBOARD_MOCK: DashboardData = {

  indicadores: {
    totalLegajos: 12,
    legajosActivos: 9,
    legajosArchivados: 3,
    requisitosCumplidos: 18,
    requisitosPendientes: 6,
    porcentajeCompletitud: 75
  },

  legajosPorEstado: [
    { estado: 'ACTIVO', cantidad: 9 },
    { estado: 'ARCHIVADO', cantidad: 3 }
  ],

  legajosPorCategoria: [
    {
      categoriaId: 'cat-001',
      categoriaNombre: 'Personal',
      cantidad: 5
    },
    {
      categoriaId: 'cat-002',
      categoriaNombre: 'Académica',
      cantidad: 4
    },
    {
      categoriaId: 'cat-003',
      categoriaNombre: 'Administrativa',
      cantidad: 3
    }
  ],

  documentosPorVencer: []
};
