
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import {
  CompletitudLegajoDTO
} from '../models/completitud-api.model';

import { PageApiDTO } from '../../../core/models/page-api.model';
import { LegajoApiDTO } from '../../../core/models/legajo-api.model';

import { COMPLETITUD_MOCK } from '../data/completitud.mock';
import { LEGAJOS_MOCK } from '../../legajos/data/legajos.mock';
import { CATEGORIAS_MOCK } from '../../categorias/data/categorias.mock';

/**
 * Modelo de presentación para el listado de completitud.
 *
 * Combina el resultado documental con los datos del legajo
 * y su categoría. No modifica el contrato público del BFF.
 */
export interface CompletitudLegajoVM extends CompletitudLegajoDTO {
  legajoTitulo: string;
  categoriaId: string;
  categoriaNombre: string;
  estadoLegajo: 'ACTIVO' | 'ARCHIVADO';
}

/**
 * Filtros para consultar la completitud documental.
 */
export interface CompletitudFiltro {
  busqueda?: string;
  categoriaId?: string;
  estado?: 'COMPLETO' | 'PENDIENTE' | '';
  page?: number;
  size?: number;
}

/**
 * Fachada temporal de datos para F-09.
 *
 * Centraliza los mocks y prepara su futura sustitución
 * por consultas al BFF.
 */
@Injectable({
  providedIn: 'root'
})
export class CompletitudDataFacade {

  /**
   * Obtiene todos los resultados de completitud.
   */
  obtenerTodos(): Observable<CompletitudLegajoVM[]> {
    return of(
      COMPLETITUD_MOCK.map(resultado =>
        this.enriquecerResultado(resultado)
      )
    );
  }

  /**
   * Consulta la completitud documental de un legajo.
   */
  obtenerPorLegajoId(
    legajoId: string
  ): Observable<CompletitudLegajoVM> {

    const resultado = COMPLETITUD_MOCK.find(
      item => item.legajoId === legajoId
    );

    if (!resultado) {
      return throwError(
        () => new Error(
          'No se encontró la información de completitud del legajo.'
        )
      );
    }

    return of(this.enriquecerResultado(resultado));
  }

  /**
   * Lista los resultados aplicando filtros y paginación.
   */
  listar(
    filtros: CompletitudFiltro = {}
  ): Observable<PageApiDTO<CompletitudLegajoVM>> {

    const page = Math.max(0, filtros.page ?? 0);
    const size = Math.max(1, filtros.size ?? 9);

    const busqueda = filtros.busqueda?.trim().toLowerCase() ?? '';
    const categoriaId = filtros.categoriaId ?? '';
    const estado = filtros.estado ?? '';

    let resultado = COMPLETITUD_MOCK
      .map(item => this.enriquecerResultado(item))
      .filter(item => {

        const coincideBusqueda =
          !busqueda ||
          item.legajoTitulo.toLowerCase().includes(busqueda) ||
          item.legajoId.toLowerCase().includes(busqueda);

        const coincideCategoria =
          !categoriaId || item.categoriaId === categoriaId;

        const coincideEstado =
          !estado ||
          (estado === 'COMPLETO' && item.resumen.completo) ||
          (estado === 'PENDIENTE' && !item.resumen.completo);

        return (
          coincideBusqueda &&
          coincideCategoria &&
          coincideEstado
        );
      });

    const totalElements = resultado.length;
    const totalPages = Math.ceil(totalElements / size);

    resultado = resultado.slice(
      page * size,
      (page + 1) * size
    );

    const respuesta: PageApiDTO<CompletitudLegajoVM> = {
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
   * Obtiene las categorías activas para los filtros.
   */
  obtenerCategorias(): { id: string; nombre: string }[] {
    return CATEGORIAS_MOCK
      .filter(categoria => categoria.activa)
      .map(categoria => ({
        id: categoria.id,
        nombre: categoria.nombre
      }));
  }

  /**
   * Obtiene los legajos disponibles.
   */
  obtenerLegajos(): LegajoApiDTO[] {
    return LEGAJOS_MOCK;
  }

  /**
   * Enriquece el resultado con los datos del legajo
   * y la categoría desde sus fuentes centrales.
   */
  private enriquecerResultado(
    resultado: CompletitudLegajoDTO
  ): CompletitudLegajoVM {

    const legajo = LEGAJOS_MOCK.find(
      item => item.id === resultado.legajoId
    );

    if (!legajo) {
      throw new Error(
        `No se encontró el legajo ${resultado.legajoId}.`
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
      ...resultado,
      legajoTitulo: legajo.titulo,
      categoriaId: categoria.id,
      categoriaNombre: categoria.nombre,
      estadoLegajo: legajo.estado
    };
  }
}
