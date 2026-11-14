
/**
 * Modelo de dominio del frontend para representar un documento.
 * Basado en el diccionario de datos consolidado de LEGGA.
 */

export interface Documento {
  /** Identificador UUID del documento. */
  id: string;

  /** Identificador del legajo asociado. */
  legajo_id: string;

  /** Nombre original del archivo. */
  nombre_original: string;

  /** Nombre visible para el usuario. */
  nombre_visible: string;

  /** Tipo MIME del archivo. */
  tipo_mime: string;

  /** Tamaño del archivo expresado en bytes. */
  tamano_bytes: number;

  /** Clave de almacenamiento del archivo en Blob Storage. */
  storage_key: string;

  /** Estado del documento según el backend. */
  estado: string;

  /** Usuario que realizó la carga. */
  uploaded_by: string;

  /** Fecha de carga. */
  created_at: string;

  /** Fecha de última actualización. */
  updated_at: string;

  /** Fecha de vencimiento opcional. Ampliación objetivo. */
  fecha_vencimiento?: string | null;

  /** Fecha en que se desvinculó el documento. */
  desvinculado_en?: string | null;

  /** Usuario que realizó la desvinculación. */
  desvinculado_por_user_id?: string | null;

  /** Motivo de la desvinculación. */
  motivo_desvinculacion?: string | null;
}
