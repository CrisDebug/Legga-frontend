
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LegajoApiDTO } from '../../../../core/models/legajo-api.model';
import { LegajosDataFacade } from '../../facade/legajos-data.facade';

@Component({
  selector: 'app-legajos-lista',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './legajos-lista.component.html',
  styleUrl: './legajos-lista.component.css'
})
export class LegajosListaComponent implements OnInit {

  private readonly legajosFacade = inject(LegajosDataFacade);

  // Registros del listado.
  legajos: LegajoApiDTO[] = [];

  // Categorías disponibles.
  categorias: { id: string; nombre: string }[] = [];

  // Valores de búsqueda y filtro.
  busqueda = '';
  categoriaSeleccionada = '';

  // Estados de pantalla.
  cargando = false;
  error: string | null = null;

  // Paginación.
  paginaActual = 0;
  tamanioPagina = 6;
  totalPaginas = 0;
  totalRegistros = 0;

  ngOnInit(): void {
    this.categorias = this.legajosFacade.obtenerCategorias();
    this.cargarLegajos();
  }

  /**
   * Carga los legajos aplicando búsqueda y categoría.
   */
  cargarLegajos(): void {
    this.cargando = true;
    this.error = null;

    this.legajosFacade.listar({
      busqueda: this.busqueda,
      categoriaId: this.categoriaSeleccionada,
      page: this.paginaActual,
      size: this.tamanioPagina
    }).subscribe({
      next: (respuesta) => {
        this.legajos = respuesta.content;
        this.totalPaginas = respuesta.totalPages;
        this.totalRegistros = respuesta.totalElements;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No fue posible cargar los legajos.';
        this.cargando = false;
      }
    });
  }

  /**
   * Actualiza la búsqueda por identificador o título.
   */
  alBuscar(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.busqueda = input.value;
    this.paginaActual = 0;

    this.cargarLegajos();
  }

  /**
   * Actualiza el filtro de categoría.
   */
  alCambiarCategoria(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.categoriaSeleccionada = select.value;
    this.paginaActual = 0;

    this.cargarLegajos();
  }

  /**
   * Avanza a la página siguiente.
   */
  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas - 1) {
      this.paginaActual++;
      this.cargarLegajos();
    }
  }

  /**
   * Regresa a la página anterior.
   */
  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.cargarLegajos();
    }
  }
}
