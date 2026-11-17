
import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  TrazabilidadDataFacade,
  TrazabilidadResumen
} from '../../facade/trazabilidad-data.facade';

import {
  HistorialItemApiDTO
} from '../../../../core/models/historial-item-api.model';

/**
 * Pantalla principal de trazabilidad LEGGA.
 *
 * Presenta el historial de operaciones, indicadores,
 * filtros, detalle del evento y ciclo de vida del legajo.
 */
@Component({
  selector: 'app-trazabilidad-lista',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    FormsModule
  ],
  templateUrl: './trazabilidad-lista.component.html',
  styleUrl: './trazabilidad-lista.component.css'
})
export class TrazabilidadListaComponent implements OnInit {

  private readonly trazabilidadFacade = inject(TrazabilidadDataFacade);

  // 1. Indicadores generales
  resumen: TrazabilidadResumen = {
    totalEventos: 0,
    eventosHoy: 0,
    legajosConActividad: 0,
    operacionesFallidas: 0
  };

  // 2. Eventos y selección
  eventos: HistorialItemApiDTO[] = [];
  eventoSeleccionado: HistorialItemApiDTO | null = null;

  // 3. Filtros
  busqueda = '';
  accionSeleccionada = '';
  resultadoSeleccionado = '';
  fechaDesde = '';
  fechaHasta = '';

  accionesDisponibles: string[] = [];

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
    this.cargarAcciones();
    this.cargarEventos();
  }

  // 7. Carga de indicadores
  cargarResumen(): void {
    this.trazabilidadFacade.obtenerResumen().subscribe({
      next: resumen => {
        this.resumen = resumen;
      },
      error: () => {
        this.error = 'No fue posible cargar los indicadores.';
      }
    });
  }

  // 8. Carga de acciones
  cargarAcciones(): void {
    this.accionesDisponibles = this.trazabilidadFacade.obtenerAcciones();
  }

  // 9. Consulta de eventos
  cargarEventos(): void {
    this.cargando = true;
    this.error = null;

    this.trazabilidadFacade.listar({
      busqueda: this.busqueda,
      accion: this.accionSeleccionada,
      resultado: this.resultadoSeleccionado,
      desde: this.fechaDesde,
      hasta: this.fechaHasta,
      page: this.paginaActual,
      size: this.tamanioPagina
    }).subscribe({
      next: respuesta => {
        this.eventos = respuesta.content;
        this.totalRegistros = respuesta.totalElements;
        this.totalPaginas = respuesta.totalPages;

        if (
          !this.eventoSeleccionado ||
          !this.eventos.some(
            e => e.eventId === this.eventoSeleccionado?.eventId
          )
        ) {
          this.eventoSeleccionado = this.eventos[0] ?? null;
        }

        this.cargando = false;
      },
      error: () => {
        this.eventos = [];
        this.eventoSeleccionado = null;
        this.error = 'No fue posible cargar los eventos de trazabilidad.';
        this.cargando = false;
      }
    });
  }

  // 10. Aplicación de filtros
  aplicarFiltros(): void {
    this.paginaActual = 0;
    this.cargarEventos();
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.accionSeleccionada = '';
    this.resultadoSeleccionado = '';
    this.fechaDesde = '';
    this.fechaHasta = '';
    this.paginaActual = 0;
    this.cargarEventos();
  }

  // 11. Selección de eventos
  seleccionarEvento(evento: HistorialItemApiDTO): void {
    this.eventoSeleccionado = evento;
  }

  // 12. Estilos dinámicos
  obtenerClaseAccion(accion: string): string {
    const clases: Record<string, string> = {
      CREACION_LEGAJO: 'evento-creacion',
      ASOCIACION_DOCUMENTO: 'evento-documento',
      DESVINCULACION_DOCUMENTO: 'evento-desvinculacion',
      MODIFICACION_LEGAJO: 'evento-modificacion',
      CAMBIO_CATEGORIA: 'evento-categoria',
      CAMBIO_PERFIL: 'evento-perfil'
    };

    return clases[accion] ?? 'evento-general';
  }

  obtenerIconoAccion(accion: string): string {
    const iconos: Record<string, string> = {
      CREACION_LEGAJO: '✚',
      ASOCIACION_DOCUMENTO: '▤',
      DESVINCULACION_DOCUMENTO: '↗',
      MODIFICACION_LEGAJO: '✎',
      CAMBIO_CATEGORIA: '▦',
      CAMBIO_PERFIL: '♙'
    };

    return iconos[accion] ?? '•';
  }

  obtenerNombreAccion(accion: string): string {
    const nombres: Record<string, string> = {
      CREACION_LEGAJO: 'Creación de legajo',
      ASOCIACION_DOCUMENTO: 'Documento asociado',
      DESVINCULACION_DOCUMENTO: 'Documento desvinculado',
      MODIFICACION_LEGAJO: 'Modificación de legajo',
      CAMBIO_CATEGORIA: 'Cambio de categoría',
      CAMBIO_PERFIL: 'Cambio de perfil'
    };

    return nombres[accion] ?? accion.replace(/_/g, ' ');
  }

  // 13. Formato de fechas
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

  // 14. Ciclo de vida del legajo
  obtenerEventosLegajo(): HistorialItemApiDTO[] {
    if (!this.eventoSeleccionado) {
      return [];
    }

    return this.eventos
      .filter(e => e.legajoId === this.eventoSeleccionado?.legajoId)
      .sort((a, b) =>
        new Date(a.fechaHora).getTime() -
        new Date(b.fechaHora).getTime()
      );
  }

  // 15. Paginación
  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.cargarEventos();
    }
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas - 1) {
      this.paginaActual++;
      this.cargarEventos();
    }
  }
}
