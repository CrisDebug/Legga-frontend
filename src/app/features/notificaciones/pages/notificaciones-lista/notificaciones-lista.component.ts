
import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  NotificacionesDataFacade,
  NotificacionesResumen,
  NotificacionVM,
  NotificacionesFiltro,
  NotificacionCategoria
} from '../../facade/notificaciones-data.facade';

import { EstadoLectura } from '../../../../core/models/notificacion-api.model';

/**
 * Pantalla principal de notificaciones LEGGA.
 *
 * Implementa F-12:
 * - Alertas de completitud documental.
 * - Alertas de vencimiento.
 * - Consulta de notificaciones.
 * - Control individual de lectura.
 *
 * Actualmente utiliza datos demostrativos.
 */
@Component({
  selector: 'app-notificaciones-lista',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    FormsModule
  ],
  templateUrl: './notificaciones-lista.component.html',
  styleUrl: './notificaciones-lista.component.css'
})
export class NotificacionesListaComponent implements OnInit {

  private readonly notificacionesFacade =
    inject(NotificacionesDataFacade);

  private readonly router = inject(Router);

  // 1. Indicadores generales
  resumen: NotificacionesResumen = {
    total: 0,
    noLeidas: 0,
    completitud: 0,
    vencimientos: 0
  };

  // 2. Notificaciones y selección
  notificaciones: NotificacionVM[] = [];
  notificacionSeleccionada: NotificacionVM | null = null;

  // 3. Filtros
  busqueda = '';
  estadoSeleccionado: EstadoLectura | '' = '';
  categoriaSeleccionada: NotificacionCategoria | '' = '';

  // 4. Paginación
  paginaActual = 0;
  tamanioPagina = 10;
  totalPaginas = 0;
  totalRegistros = 0;

  // 5. Estados de pantalla
  cargando = false;
  error: string | null = null;

  // 6. Inicialización
  ngOnInit(): void {
    this.cargarResumen();
    this.cargarNotificaciones();
  }

  // 7. Carga de indicadores
  cargarResumen(): void {
    this.notificacionesFacade.obtenerResumen().subscribe({
      next: resumen => {
        this.resumen = resumen;
      },
      error: () => {
        this.error = 'No fue posible cargar los indicadores.';
      }
    });
  }

  // 8. Consulta de notificaciones
  cargarNotificaciones(): void {
    this.cargando = true;
    this.error = null;

    const filtros: NotificacionesFiltro = {
      busqueda: this.busqueda,
      estadoLectura: this.estadoSeleccionado,
      categoria: this.categoriaSeleccionada,
      page: this.paginaActual,
      size: this.tamanioPagina
    };

    this.notificacionesFacade.listar(filtros).subscribe({
      next: respuesta => {
        this.notificaciones = respuesta.content;
        this.totalRegistros = respuesta.totalElements;
        this.totalPaginas = respuesta.totalPages;

        if (
          !this.notificacionSeleccionada ||
          !this.notificaciones.some(
            item => item.id === this.notificacionSeleccionada?.id
          )
        ) {
          this.notificacionSeleccionada =
            this.notificaciones[0] ?? null;
        }

        this.cargando = false;
      },
      error: () => {
        this.notificaciones = [];
        this.notificacionSeleccionada = null;
        this.error =
          'No fue posible cargar las notificaciones.';
        this.cargando = false;
      }
    });
  }

  // 9. Aplicación de filtros
  aplicarFiltros(): void {
    this.paginaActual = 0;
    this.cargarNotificaciones();
  }

  filtrarPorEstado(estado: EstadoLectura | ''): void {
    this.estadoSeleccionado = estado;
    this.aplicarFiltros();
  }

  filtrarPorCategoria(
    categoria: NotificacionCategoria | ''
  ): void {
    this.categoriaSeleccionada = categoria;
    this.aplicarFiltros();
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.estadoSeleccionado = '';
    this.categoriaSeleccionada = '';
    this.paginaActual = 0;
    this.cargarNotificaciones();
  }

  // 10. Selección de notificaciones
  seleccionarNotificacion(
    notificacion: NotificacionVM
  ): void {
    this.notificacionSeleccionada = notificacion;
  }

  // 11. Estado de lectura
  marcarComoLeida(notificacion: NotificacionVM): void {
    if (notificacion.estadoLectura === 'LEIDA') {
      return;
    }

    this.notificacionesFacade
      .marcarComoLeida(notificacion.id)
      .subscribe({
        next: actualizado => {
          if (actualizado) {
            notificacion.estadoLectura = 'LEIDA';
            notificacion.leidaEn = new Date().toISOString();

            if (
              this.notificacionSeleccionada?.id === notificacion.id
            ) {
              this.notificacionSeleccionada = {
                ...notificacion
              };
            }

            this.cargarResumen();
            this.cargarNotificaciones();
          }
        },
        error: () => {
          this.error =
            'No fue posible actualizar el estado de lectura.';
        }
      });
  }

  marcarSeleccionadaComoLeida(): void {
    if (this.notificacionSeleccionada) {
      this.marcarComoLeida(this.notificacionSeleccionada);
    }
  }

  // 12. Navegación a entidad relacionada
  abrirRelacionado(notificacion: NotificacionVM): void {
    if (!notificacion.entidadId) {
      return;
    }

    if (notificacion.entidadTipo === 'LEGAJO') {
      void this.router.navigate([
        '/legajos',
        notificacion.entidadId
      ]);
      return;
    }

    if (notificacion.entidadTipo === 'DOCUMENTO') {
      void this.router.navigate(['/documentos']);
    }
  }

  // 13. Clasificación visual
  obtenerNombreCategoria(
    categoria: NotificacionCategoria
  ): string {
    return categoria === 'COMPLETITUD'
      ? 'Completitud documental'
      : 'Vencimientos';
  }

  obtenerNombreEstado(estado: EstadoLectura): string {
    return estado === 'NO_LEIDA'
      ? 'No leída'
      : 'Leída';
  }

  obtenerNombreTipo(tipo: string): string {
    const nombres: Record<string, string> = {
      COMPLETITUD_INCOMPLETA: 'Documentación incompleta',
      COMPLETITUD_COMPLETA: 'Documentación completa',
      DOCUMENTO_POR_VENCER: 'Próximo vencimiento',
      DOCUMENTO_VENCIDO: 'Documento vencido'
    };

    return nombres[tipo] ?? tipo.replace(/_/g, ' ');
  }

  obtenerIconoCategoria(
    categoria: NotificacionCategoria
  ): string {
    return categoria === 'COMPLETITUD' ? '▤' : '◷';
  }

  obtenerClaseCategoria(
    categoria: NotificacionCategoria
  ): string {
    return categoria === 'COMPLETITUD'
      ? 'notificacion-completitud'
      : 'notificacion-vencimiento';
  }

  // 14. Formato de fechas
  formatearFecha(fecha: string): string {
    return new Intl.DateTimeFormat('es-CL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(fecha));
  }

  formatearHora(fecha: string): string {
    return new Intl.DateTimeFormat('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(new Date(fecha));
  }

  // 15. Paginación
  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.cargarNotificaciones();
    }
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas - 1) {
      this.paginaActual++;
      this.cargarNotificaciones();
    }
  }
}
