
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import {
  DocumentoApiDTO,
  DocumentoEstado
} from '../../../core/models/documento-api.model';

import { PageApiDTO } from '../../../core/models/page-api.model';
import { LegajoApiDTO } from '../../../core/models/legajo-api.model';
import { CategoriaApiDTO } from '../../../core/models/categoria-api.model';

import { DOCUMENTOS_MOCK } from '../data/documentos.mock';
import { LEGAJOS_MOCK } from '../../legajos/data/legajos.mock';
import { CATEGORIAS_MOCK } from '../../categorias/data/categorias.mock';

/**
 * Filtros disponibles para la biblioteca documental.
 */
export interface DocumentosFiltro {
  busqueda?: string;
  estado?: DocumentoEstado | '';
  legajoId?: string;
  categoriaId?: string;
  page?: number;
  size?: number;
}

/**
 * Documento enriquecido exclusivamente para presentación.
 *
 * Estos datos se calculan mediante relaciones con los mocks
 * centrales. No forman parte del contrato DocumentoApiDTO
 * ni deben enviarse al BFF como campos del documento.
 */
export interface DocumentoBibliotecaVM extends DocumentoApiDTO {
  legajoTitulo: string;
  categoriaId: string;
  categoriaNombre: string;
}

/**
 * Fachada temporal de documentos.
 *
 * Centraliza el acceso a los mocks y prepara los datos
 * para su futura conexión con el BFF.
 */
@Injectable({
  providedIn: 'root'
})
export class DocumentosDataFacade {

  /**
   * Devuelve documentos enriquecidos con información
   * de su legajo y categoría.
   */
  obtenerTodos(): Observable<DocumentoBibliotecaVM[]> {
    const documentos = DOCUMENTOS_MOCK.map(documento =>
      this.enriquecerDocumento(documento)
    );

    return of(documentos);
  }

  /**
   * Obtiene un documento por su identificador.
   */
  obtenerPorId(id: string): Observable<DocumentoBibliotecaVM> {
    const documento = DOCUMENTOS_MOCK.find(item => item.id === id);

    if (!documento) {
      return throwError(
        () => new Error('No se encontró el documento solicitado.')
      );
    }

    return of(this.enriquecerDocumento(documento));
  }

  /**
   * Lista documentos aplicando búsqueda, filtros y paginación.
   */
  listar(
    filtros: DocumentosFiltro = {}
  ): Observable<PageApiDTO<DocumentoBibliotecaVM>> {

    const page = Math.max(0, filtros.page ?? 0);
    const size = Math.max(1, filtros.size ?? 9);

    const busqueda = filtros.busqueda?.trim().toLowerCase() ?? '';
    const estado = filtros.estado ?? '';
    const legajoId = filtros.legajoId ?? '';
    const categoriaId = filtros.categoriaId ?? '';

    let resultado = DOCUMENTOS_MOCK
      .map(documento => this.enriquecerDocumento(documento))
      .filter(documento => {

        const coincideBusqueda =
          !busqueda ||
          documento.nombreVisible.toLowerCase().includes(busqueda) ||
          documento.nombreOriginal.toLowerCase().includes(busqueda) ||
          documento.legajoTitulo.toLowerCase().includes(busqueda);

        const coincideEstado =
          !estado || documento.estado === estado;

        const coincideLegajo =
          !legajoId || documento.legajoId === legajoId;

        const coincideCategoria =
          !categoriaId || documento.categoriaId === categoriaId;

        return (
          coincideBusqueda &&
          coincideEstado &&
          coincideLegajo &&
          coincideCategoria
        );
      });

    const totalElements = resultado.length;
    const totalPages = Math.ceil(totalElements / size);

    resultado = resultado.slice(
      page * size,
      (page + 1) * size
    );

    const respuesta: PageApiDTO<DocumentoBibliotecaVM> = {
      content: resultado,
      page,
      size,
      totalElements,
      totalPages,
      first: page === 0,
      last: totalPages === 0 || page >= totalPages - 1
    };

    return of(respuesta);
  }

  /**
   * Devuelve las categorías activas para el filtro.
   */
  obtenerCategorias(): CategoriaApiDTO[] {
    return CATEGORIAS_MOCK.filter(categoria => categoria.activa);
  }

  /**
   * Devuelve los legajos disponibles para filtrar.
   */
  obtenerLegajos(): LegajoApiDTO[] {
    return LEGAJOS_MOCK;
  }

  /**
   * Traduce las relaciones de los mocks a un modelo
   * preparado para mostrar en la biblioteca.
   */
  private enriquecerDocumento(
    documento: DocumentoApiDTO
  ): DocumentoBibliotecaVM {

    const legajo = LEGAJOS_MOCK.find(
      item => item.id === documento.legajoId
    );

    if (!legajo) {
      throw new Error(
        `No se encontró el legajo asociado al documento ${documento.id}.`
      );
    }

    const categoria = CATEGORIAS_MOCK.find(
      item => item.id === legajo.categoriaId
    );

    if (!categoria) {
      throw new Error(
        `No se encontró la categoría del legajo ${legajo.id}.`
      );
    }

    return {
      ...documento,
      legajoTitulo: legajo.titulo,
      categoriaId: categoria.id,
      categoriaNombre: categoria.nombre
    };
  }
}
