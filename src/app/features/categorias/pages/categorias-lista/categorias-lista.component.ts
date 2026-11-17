
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CATEGORIAS_MOCK } from '../../data/categorias.mock';

/**
 * Listado de categorías de LEGGA.
 *
 * Los datos se obtienen desde el catálogo mock compartido.
 * Posteriormente se conectará mediante CategoriasApiService.
 */
@Component({
  selector: 'app-categorias-lista',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categorias-lista.component.html',
  styleUrl: './categorias-lista.component.css'
})
export class CategoriasListaComponent {

  // Catálogo compartido de categorías.
  categorias = CATEGORIAS_MOCK;

  // Estado de carga de la pantalla.
  cargando = false;
}
