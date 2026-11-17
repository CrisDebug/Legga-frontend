
/**
 * Modelos de datos para los campos dinámicos de LEGGA.
 * Referencia: LEGGA_Diccionario_Datos_Consolidado_v2.0
 *
 * Tabla: legajos.categoria_campo
 */
export interface CategoriaCampo {
  id: string;
  categoria_id: string;
  codigo: string;
  etiqueta: string;
  tipo_dato: string;
  obligatorio: boolean;
  orden: number;
  activo: boolean;
  opciones: unknown | null;
  created_at: string;
  updated_at: string;
}

/**
 * Valores ingresados en los campos dinámicos de un legajo.
 *
 * Tabla: legajos.legajo_campo_valor
 */
export interface LegajoCampoValor {
  id: string;
  legajo_id: string;
  categoria_campo_id: string;
  valor: unknown | null;
  created_at: string;
  updated_at: string;
}
