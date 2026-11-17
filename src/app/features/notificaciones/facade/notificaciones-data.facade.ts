
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  NotificacionApiDTO,
  EstadoLectura
} from '../../../core/models/notificacion-api.model';

import { PageApiDTO } from '../../../core/models/page-api.model';
import { NOTIFICACIONES_MOCK } from '../data/notificaciones.mock';

/**
 * Categorías visuales utilizadas exclusivamente
 * por la interfaz. No forman parte del DTO del BFF.
 */
export type NotificacionCategoria =
  | 'COMPLETITUD'
  | 'VENCIMIENTO';

/**
 * Filtros disponibles en la bandeja.
 */
export interface NotificacionesFiltro {
  busqueda?: string;
  estadoLectura?: EstadoLectura | '';
  categoria?: NotificacionCategoria | '';
  page?: number;
  size?: number;
}

/**
 * Modelo enriquecido exclusivamente para presentación.
 */
export interface NotificacionVM extends NotificacionApiDTO {
  categoria: NotificacionCategoria;
  entidadDescripcion: string;
}

/**
 * Indicadores de la bandeja de notificaciones.
 */
export interface NotificacionesResumen {
  total: number;
  noLeidas: number;
  completitud: number;
  vencimientos: number;
}

/**
 * Fachada temporal de notificaciones.
 *
 * Centraliza listado, filtros, paginación,
 * indicadores y estado de lectura.
 *
 * Actualmente utiliza mocks.
 * Posteriormente consumirá exclusivamente el BFF.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificacionesDataFacade {

  /**
   * Obtiene todas las notificaciones.
   */
  obtenerTodos(): Observable<NotificacionVM[]> {
    return of(
      NOTIFICACIONES_MOCK.map(notificacion =>
        this.enriquecerNotificacion(notificacion)
      )
    );
  }

  /**
   * Obtiene una notificación por su identificador.
   */
  obtenerPorId(id: string): Observable<NotificacionVM | undefined> {
    const notificacion = NOTIFICACIONES_MOCK.find(
      item => item.id === id
    );

    return of(
      notificacion
        ? this.enriquecerNotificacion(notificacion)
        : undefined
    );
  }

  /**
   * Lista notificaciones con búsqueda,
   * filtros y paginación.
   */
  listar(
    filtros: NotificacionesFiltro = {}
  ): Observable<PageApiDTO<NotificacionVM>> {

    const page = Math.max(0, filtros.page ?? 0);
    const size = Math.max(1, filtros.size ?? 10);

    const busqueda = filtros.busqueda
      ?.trim()
      .toLowerCase() ?? '';

    const estadoLectura = filtros.estadoLectura ?? '';
    const categoria = filtros.categoria ?? '';

    let resultado = NOTIFICACIONES_MOCK
      .map(notificacion =>
        this.enriquecerNotificacion(notificacion)
      )
      .filter(notificacion => {

        const coincideBusqueda =
          !busqueda ||
          notificacion.titulo.toLowerCase().includes(busqueda) ||
          notificacion.mensaje.toLowerCase().includes(busqueda) ||
          (notificacion.entidadId ?? '').toLowerCase().includes(busqueda);

        const coincideEstado =
          !estadoLectura ||
          notificacion.estadoLectura === estadoLectura;

        const coincideCategoria =
          !categoria ||
          notificacion.categoria === categoria;

        return (
          coincideBusqueda &&
          coincideEstado &&
          coincideCategoria
        );
      });

    // Orden cronológico descendente.
    resultado.sort(
      (a, b) =>
        new Date(b.creadaEn).getTime() -
        new Date(a.creadaEn).getTime()
    );

    const totalElements = resultado.length;
    const totalPages = Math.ceil(totalElements / size);

    resultado = resultado.slice(
      page * size,
      (page + 1) * size
    );

    const respuesta: PageApiDTO<NotificacionVM> = {
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
   * Calcula los indicadores de la bandeja.
   */
  obtenerResumen(): Observable<NotificacionesResumen> {

    const notificaciones = NOTIFICACIONES_MOCK;

    const noLeidas = notificaciones.filter(
      item => item.estadoLectura === 'NO_LEIDA'
    );

    return of({
      total: notificaciones.length,
      noLeidas: noLeidas.length,
      completitud: noLeidas.filter(
        item => this.obtenerCategoria(item.tipo) === 'COMPLETITUD'
      ).length,
      vencimientos: noLeidas.filter(
        item => this.obtenerCategoria(item.tipo) === 'VENCIMIENTO'
      ).length
    });
  }

  /**
   * Marca una notificación como leída.
   *
   * Modifica el mock en memoria para permitir
   * probar la interacción de la pantalla.
   *
   * Al actualizar la aplicación, los datos vuelven
   * a su estado inicial.
   */
  marcarComoLeida(id: string): Observable<boolean> {

    const notificacion = NOTIFICACIONES_MOCK.find(
      item => item.id === id
    );

    if (!notificacion) {
      return of(false);
    }

    if (notificacion.estadoLectura === 'LEIDA') {
      return of(true);
    }

    notificacion.estadoLectura = 'LEIDA';
    notificacion.leidaEn = new Date().toISOString();

    return of(true);
  }

  /**
   * Obtiene la categoría visual desde el tipo BFF.
   */
  private obtenerCategoria(
    tipo: string
  ): NotificacionCategoria {

    return tipo.startsWith('DOCUMENTO_')
      ? 'VENCIMIENTO'
      : 'COMPLETITUD';
  }

  /**
   * Enriquece el DTO sin modificar su contrato público.
   */
  private enriquecerNotificacion(
    notificacion: NotificacionApiDTO
  ): NotificacionVM {

    return {
      ...notificacion,
      categoria: this.obtenerCategoria(notificacion.tipo),
      entidadDescripcion:
        notificacion.entidadTipo === 'DOCUMENTO'
          ? 'Documento relacionado'
          : 'Legajo relacionado'
    };
  }
}
