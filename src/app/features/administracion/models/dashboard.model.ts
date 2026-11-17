/**
 * Modelos internos del módulo de administración.
 * Alineados con los contratos públicos F-13 del BFF.
 */

export interface DashboardIndicadores {
  totalLegajos: number;
  legajosActivos: number;
  legajosArchivados: number;
  requisitosCumplidos: number;
  requisitosPendientes: number;
  porcentajeCompletitud: number;
}

export interface LegajosPorEstado {
  estado: string;
  cantidad: number;
}

export interface LegajosPorCategoria {
  categoriaId: string;
  categoriaNombre: string;
  cantidad: number;
}

export interface DocumentosPorVencer {
  documentoId: string;
  nombreVisible: string;
  fechaVencimiento: string;
  legajoId: string;
}

/**
 * Información consolidada que consume la pantalla.
 */
export interface DashboardData {
  indicadores: DashboardIndicadores;
  legajosPorEstado: LegajosPorEstado[];
  legajosPorCategoria: LegajosPorCategoria[];
  documentosPorVencer: DocumentosPorVencer[];
}