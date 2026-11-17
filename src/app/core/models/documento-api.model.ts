
/**
 * Contrato público del BFF para representar un documento.
 *
 * Fuente: LEGGA - Contratos Públicos BFF y DTOs v1.2.
 * Base de datos: Diccionario de Datos Consolidado v2.0.
 *
 * Este modelo representa exclusivamente la respuesta pública
 * que consume Angular. No expone columnas internas como
 * storage_key ni replica directamente la entidad SQL.
 */

/**
 * Estados públicos de asociación documental definidos por el BFF.
 */
export type DocumentoEstado = 'ASOCIADO' | 'DESVINCULADO';

/**
 * Representación pública de un documento en LEGGA.
 */
export interface DocumentoApiDTO {
  id: string;
  legajoId: string;
  nombreOriginal: string;
  nombreVisible: string;
  tipoMime: string;
  tamanoBytes: number;
  estado: DocumentoEstado;
  fechaVencimiento: string | null;
  uploadedAt: string;
  uploadedByNombre?: string | null;
  desvinculadoEn?: string | null;
  motivoDesvinculacion?: string | null;
}

/**
 * Datos públicos para solicitar el acceso temporal
 * a la descarga de un documento mediante SAS.
 *
 * La URL es temporal y no debe persistirse.
 */
export interface DownloadAccessDTO {
  url: string;
  expiresAt: string;
  fileName: string;
  contentType: string;
}

/**
 * Metadatos opcionales asociados a la carga de un documento.
 * La carga corresponde a un archivo por solicitud.
 */
export interface UploadDocumentoMetadata {
  nombreVisible?: string;
  fechaVencimiento?: string | null;
  requisitoIds?: string[];
}

/**
 * Solicitud pública para cambiar el nombre visible.
 */
export interface CambiarNombreDocumentoRequest {
  nombreVisible: string;
}

/**
 * Solicitud pública para desvincular un documento.
 * La desvinculación no elimina físicamente el archivo.
 */
export interface DesvincularDocumentoRequest {
  motivo: string;
}
