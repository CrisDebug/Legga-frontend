
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CATEGORIAS_MOCK } from '../../data/categorias.mock';

import { IdentidadService } from '../../../../core/services/identidad.service';

/**
 * Listado de categorías de LEGGA.
 *
 * Los datos se obtienen desde el catálogo mock compartido.
 * Los permisos se recuperan desde el contexto de identidad.
 */
@Component({
  selector: 'app-categorias-lista',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categorias-lista.component.html',
  styleUrl: './categorias-lista.component.css'
})
export class CategoriasListaComponent implements OnInit {

  private readonly identidadService = inject(IdentidadService);

  // ==================================================
  // 1. CATÁLOGO DE CATEGORÍAS
  // ==================================================

  categorias = CATEGORIAS_MOCK;

  cargando = false;

  // ==================================================
  // 2. PERMISOS FUNCIONALES
  // ==================================================

  puedeCrearCategoria = false;

  // ==================================================
  // 3. INICIALIZACIÓN
  // ==================================================

  ngOnInit(): void {
    this.cargarPermisos();
  }

  // ==================================================
  // 4. CONSULTAR PERMISO DE CREACIÓN
  // ==================================================

  private cargarPermisos(): void {

    this.identidadService.consultarContexto().subscribe({

      next: (contexto) => {

        this.puedeCrearCategoria =
          this.identidadService.tienePermiso(
            contexto,
            'F-03-CREAR-CAT'
          );

      },

      error: (error) => {

        this.puedeCrearCategoria = false;

        console.error(
          'No fue posible consultar los permisos de categorías:',
          error
        );

      }

    });
  }

}
