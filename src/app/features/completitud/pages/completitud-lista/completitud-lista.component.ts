
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  CompletitudDataFacade,
  CompletitudLegajoVM
} from '../../facade/completitud-data.facade';

/**
 * Pantalla de consulta de completitud documental F-09.
 *
 * Permite identificar legajos completos y pendientes,
 * consultar sus requisitos y filtrar resultados.
 */
@Component({
  selector: 'app-completitud-lista',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './completitud-lista.component.html',
  styleUrl: './completitud-lista.component.css'
})
export class CompletitudListaComponent implements OnInit {

  private readonly completitudFacade = inject(CompletitudDataFacade);

  // Resultados de la página actual.
  resultados: CompletitudLegajoVM[] = [];

  // Categorías disponibles.
  categorias: { id: string; nombre: string }[] = [];

  // Búsqueda y filtros.
  busqueda = '';
  categoriaSeleccionada = '';
  estadoSeleccionado: 'COMPLETO' | 'PENDIENTE' | '' = '';

  // Indicadores generales.
  totalLegajos = 0;
  legajosCompletos = 0;
  legajosPendientes = 0;
  porcentajeGeneral = 0;

  // Estados de pantalla.
  cargando = false;
  error: string | null = null;

  // Paginación.
  paginaActual = 0;
  tamanioPagina = 9;
  totalPaginas = 0;
  totalRegistros = 0;

  ngOnInit(): void {
    this.categorias = this.completitudFacade.obtenerCategorias();
    this.cargarResumenGeneral();
    this.cargarResultados();
  }

  /**
   * Calcula los indicadores generales usando todos los legajos.
   */
  cargarResumenGeneral(): void {
    this.completitudFacade.obtenerTodos().subscribe({
      next: resultados => {
        this.totalLegajos = resultados.length;

        this.legajosCompletos = resultados.filter(
          item => item.resumen.completo
        ).length;

        this.legajosPendientes =
          this.totalLegajos - this.legajosCompletos;

        this.porcentajeGeneral = this.totalLegajos === 0
          ? 0
          : Math.round(
              resultados.reduce(
                (total, item) => total + item.resumen.porcentajeCompletitud,
                0
              ) / this.totalLegajos
            );
      },
      error: () => {
        this.error = 'No fue posible calcular el resumen documental.';
      }
    });
  }

  /**
   * Consulta los resultados con los filtros seleccionados.
   */
  cargarResultados(): void {
    this.cargando = true;
    this.error = null;

    this.completitudFacade.listar({
      busqueda: this.busqueda,
      categoriaId: this.categoriaSeleccionada,
      estado: this.estadoSeleccionado,
      page: this.paginaActual,
      size: this.tamanioPagina
    }).subscribe({
      next: respuesta => {
        this.resultados = respuesta.content;
        this.totalPaginas = respuesta.totalPages;
        this.totalRegistros = respuesta.totalElements;
        this.cargando = false;
      },
      error: () => {
        this.resultados = [];
        this.error = 'No fue posible cargar la completitud documental.';
        this.cargando = false;
      }
    });
  }

  /**
   * Actualiza el buscador.
   */
  alBuscar(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.busqueda = input.value;
    this.paginaActual = 0;

    this.cargarResultados();
  }

  /**
   * Actualiza el filtro por categoría.
   */
  alCambiarCategoria(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.categoriaSeleccionada = select.value;
    this.paginaActual = 0;

    this.cargarResultados();
  }

  /**
   * Actualiza el filtro por estado de completitud.
   */
  alCambiarEstado(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.estadoSeleccionado = select.value as
      'COMPLETO' | 'PENDIENTE' | '';

    this.paginaActual = 0;

    this.cargarResultados();
  }

  /**
   * Avanza a la página siguiente.
   */
  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas - 1) {
      this.paginaActual++;
      this.cargarResultados();
    }
  }

  /**
   * Regresa a la página anterior.
   */
  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.cargarResultados();
    }
  }

  /**
   * Determina la clase visual de la barra de progreso.
   */
  obtenerClaseProgreso(porcentaje: number): string {
    if (porcentaje === 100) {
      return 'progreso-completo';
    }

    if (porcentaje >= 50) {
      return 'progreso-intermedio';
    }

    return 'progreso-bajo';
  }

  /**
   * Formatea la fecha de cálculo.
   */
  formatearFecha(fecha: string): string {
    return new Intl.DateTimeFormat('es-CL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(fecha));
  }
}
