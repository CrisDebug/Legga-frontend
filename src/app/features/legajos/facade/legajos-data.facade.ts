
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import {
  LegajoApiDTO,
  CreateLegajoRequest,
  UpdateLegajoRequest
} from '../../../core/models/legajo-api.model';

import { PageApiDTO } from '../../../core/models/page-api.model';

import { CATEGORIAS_MOCK } from '../../categorias/data/categorias.mock';
import { LEGAJOS_MOCK } from '../data/legajos.mock';

/**
 * Parámetros para consultar y filtrar legajos.
 */
export interface LegajosFiltro {
  busqueda?: string;
  categoriaId?: string;
  page?: number;
  size?: number;
}

/**
 * Fachada temporal de datos para el módulo de legajos.
 *
 * Centraliza el acceso a los mocks para facilitar
 * su futura sustitución por servicios conectados al BFF.
 */
@Injectable({
  providedIn: 'root'
})
export class LegajosDataFacade {

  /**
   * Obtiene las categorías activas.
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
   * Consulta un legajo por su identificador.
   */
  obtenerPorId(id: string): Observable<LegajoApiDTO> {
    const legajo = LEGAJOS_MOCK.find(item => item.id === id);

    if (!legajo) {
      return throwError(
        () => new Error('No se encontró el legajo solicitado.')
      );
    }

    return of(legajo);
  }

  /**
   * Busca y filtra legajos con paginación local.
   */
  listar(
    filtros: LegajosFiltro = {}
  ): Observable<PageApiDTO<LegajoApiDTO>> {

    const page = filtros.page ?? 0;
    const size = filtros.size ?? 6;

    const busqueda = filtros.busqueda?.trim().toLowerCase() ?? '';
    const categoriaId = filtros.categoriaId ?? '';

    let resultado = LEGAJOS_MOCK.filter(legajo => {

      const coincideBusqueda =
        !busqueda ||
        legajo.id.toLowerCase().includes(busqueda) ||
        legajo.titulo.toLowerCase().includes(busqueda);

      const coincideCategoria =
        !categoriaId || legajo.categoriaId === categoriaId;

      return coincideBusqueda && coincideCategoria;
    });

    const totalElements = resultado.length;
    const totalPages = Math.ceil(totalElements / size);

    resultado = resultado.slice(page * size, (page + 1) * size);

    const respuesta: PageApiDTO<LegajoApiDTO> = {
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
   * Crea un legajo temporalmente en memoria.
   */
  crear(request: CreateLegajoRequest): Observable<LegajoApiDTO> {

    const categoria = CATEGORIAS_MOCK.find(
      item => item.id === request.categoriaId && item.activa
    );

    if (!categoria) {
      return throwError(
        () => new Error('La categoría seleccionada no está disponible.')
      );
    }

    const siguienteNumero = LEGAJOS_MOCK.reduce((maximo, legajo) => {
      const numero = Number(legajo.id.split('-').pop()) || 0;
      return Math.max(maximo, numero);
    }, 0) + 1;

    const fechaActual = new Date().toISOString();

    const nuevoLegajo: LegajoApiDTO = {
      id: `legajo-${String(siguienteNumero).padStart(3, '0')}`,
      titulo: request.titulo.trim(),
      descripcion: request.descripcion?.trim() || null,
      categoriaId: categoria.id,
      categoriaNombre: categoria.nombre,
      estado: 'ACTIVO',
      creadoPorNombre: null,
      createdAt: fechaActual,
      updatedAt: fechaActual
    };

    LEGAJOS_MOCK.unshift(nuevoLegajo);

    return of(nuevoLegajo);
  }

  /**
   * Actualiza los datos de un legajo existente.
   */
  actualizar(
    id: string,
    request: UpdateLegajoRequest
  ): Observable<LegajoApiDTO> {

    const indice = LEGAJOS_MOCK.findIndex(
      legajo => legajo.id === id
    );

    if (indice === -1) {
      return throwError(
        () => new Error('No se encontró el legajo que deseas actualizar.')
      );
    }

    const categoria = CATEGORIAS_MOCK.find(
      item => item.id === request.categoriaId && item.activa
    );

    if (!categoria) {
      return throwError(
        () => new Error('La categoría seleccionada no está disponible.')
      );
    }

    const legajoActualizado: LegajoApiDTO = {
      ...LEGAJOS_MOCK[indice],
      titulo: request.titulo.trim(),
      descripcion: request.descripcion?.trim() || null,
      categoriaId: categoria.id,
      categoriaNombre: categoria.nombre,
      updatedAt: new Date().toISOString()
    };

    LEGAJOS_MOCK[indice] = legajoActualizado;

    return of(legajoActualizado);
  }
}
