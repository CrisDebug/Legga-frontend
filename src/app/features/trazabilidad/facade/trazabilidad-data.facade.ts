
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HistorialItemApiDTO } from '../../../core/models/historial-item-api.model';
import { TRAZABILIDAD_MOCK } from '../data/trazabilidad.mock';

/**
 * Filtros disponibles en la consulta de trazabilidad.
 */
export interface TrazabilidadFiltro {
  busqueda?: string;
  accion?: string;
  resultado?: string;
  desde?: string;
  hasta?: string;
  page?: number;
  size?: number;
}

/**
 * Respuesta paginada de eventos.
 */
export interface TrazabilidadPagina {
  content: HistorialItemApiDTO[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

/**
 * Indicadores generales de trazabilidad.
 */
export interface TrazabilidadResumen {
  totalEventos: number;
  eventosHoy: number;
  legajosConActividad: number;
  operacionesFallidas: number;
}

/**
 * Facade de acceso a los datos de trazabilidad.
 *
 * Centraliza la consulta de eventos, filtros, paginación
 * e indicadores de actividad.
 *
 * Actualmente utiliza datos demostrativos.
 * Posteriormente se conectará con el BFF.
 */
@Injectable({
  providedIn: 'root'
})
export class TrazabilidadDataFacade {

  /**
   * Obtiene todos los eventos disponibles.
   */
  obtenerTodos(): Observable<HistorialItemApiDTO[]> {
    return of([...TRAZABILIDAD_MOCK]);
  }

  /**
   * Obtiene los eventos asociados a un legajo.
   */
  obtenerPorLegajoId(
    legajoId: string
  ): Observable<HistorialItemApiDTO[]> {

    const eventos = TRAZABILIDAD_MOCK.filter(
      evento => evento.legajoId === legajoId
    );

    return of(eventos);
  }

  /**
   * Aplica búsqueda, filtros y paginación.
   */
  listar(
    filtro: TrazabilidadFiltro = {}
  ): Observable<TrazabilidadPagina> {

    const busqueda = (filtro.busqueda ?? '')
      .trim()
      .toLowerCase();

    let eventos = [...TRAZABILIDAD_MOCK];

    // -------------------------------------------------
    // Búsqueda por legajo, usuario, acción o descripción
    // -------------------------------------------------
    if (busqueda) {
      eventos = eventos.filter(evento =>
        evento.legajoId.toLowerCase().includes(busqueda) ||
        (evento.actorNombre ?? '').toLowerCase().includes(busqueda) ||
        evento.accion.toLowerCase().includes(busqueda) ||
        evento.descripcion.toLowerCase().includes(busqueda)
      );
    }

    // -------------------------------------------------
    // Filtro por tipo de acción
    // -------------------------------------------------
    if (filtro.accion) {
      eventos = eventos.filter(
        evento => evento.accion === filtro.accion
      );
    }

    // -------------------------------------------------
    // Filtro por resultado
    // -------------------------------------------------
    if (filtro.resultado) {
      eventos = eventos.filter(
        evento => evento.resultado === filtro.resultado
      );
    }

    // -------------------------------------------------
    // Filtro por fecha inicial
    // -------------------------------------------------
    if (filtro.desde) {
      eventos = eventos.filter(
        evento => evento.fechaHora.slice(0, 10) >= filtro.desde!
      );
    }

    // -------------------------------------------------
    // Filtro por fecha final
    // -------------------------------------------------
    if (filtro.hasta) {
      eventos = eventos.filter(
        evento => evento.fechaHora.slice(0, 10) <= filtro.hasta!
      );
    }

    // -------------------------------------------------
    // Orden cronológico descendente
    // -------------------------------------------------
    eventos.sort(
      (a, b) =>
        new Date(b.fechaHora).getTime() -
        new Date(a.fechaHora).getTime()
    );

    // -------------------------------------------------
    // Paginación
    // -------------------------------------------------
    const page = Math.max(0, filtro.page ?? 0);
    const size = Math.max(1, filtro.size ?? 10);

    const totalElements = eventos.length;
    const totalPages = Math.ceil(totalElements / size);

    const inicio = page * size;

    const content = eventos.slice(
      inicio,
      inicio + size
    );

    return of({
      content,
      totalElements,
      totalPages,
      page,
      size
    });
  }

  /**
   * Calcula indicadores generales.
   *
   * La fecha se compara con la fecha local del navegador.
   * Los indicadores son demostrativos mientras se utilice el mock.
   */
  obtenerResumen(): Observable<TrazabilidadResumen> {

    const eventos = TRAZABILIDAD_MOCK;

    const hoy = new Date().toLocaleDateString('en-CA');

    const eventosHoy = eventos.filter(
      evento => evento.fechaHora.slice(0, 10) === hoy
    ).length;

    const legajosConActividad = new Set(
      eventos.map(evento => evento.legajoId)
    ).size;

    const operacionesFallidas = eventos.filter(
      evento => evento.resultado === 'FALLIDO'
    ).length;

    return of({
      totalEventos: eventos.length,
      eventosHoy,
      legajosConActividad,
      operacionesFallidas
    });
  }

  /**
   * Obtiene las acciones distintas para construir filtros.
   */
  obtenerAcciones(): string[] {
    return [...new Set(
      TRAZABILIDAD_MOCK.map(evento => evento.accion)
    )];
  }
}
