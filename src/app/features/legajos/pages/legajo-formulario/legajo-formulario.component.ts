
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { LegajosDataFacade } from '../../facade/legajos-data.facade';

/**
 * Formulario para crear un nuevo legajo.
 *
 * Utiliza la fachada de datos para mantener desacoplada
 * la interfaz de la fuente de información.
 */
@Component({
  selector: 'app-legajo-formulario',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './legajo-formulario.component.html',
  styleUrl: './legajo-formulario.component.css'
})
export class LegajoFormularioComponent implements OnInit {

  private readonly legajosFacade = inject(LegajosDataFacade);
  private readonly router = inject(Router);

  // Datos del formulario.
  titulo = '';
  descripcion = '';
  categoriaId = '';

  // Categorías compartidas del catálogo.
  categorias: { id: string; nombre: string }[] = [];

  // Estado de la pantalla.
  guardando = false;
  error = '';

  ngOnInit(): void {
    this.categorias = this.legajosFacade.obtenerCategorias();
  }

  /**
   * Valida el título ingresado.
   */
  get tituloValido(): boolean {
    return this.titulo.trim().length > 0 &&
      this.titulo.trim().length <= 150;
  }

  /**
   * Comprueba que el formulario esté completo.
   */
  get formularioValido(): boolean {
    return this.tituloValido &&
      this.categoriaId !== '' &&
      this.descripcion.length <= 500;
  }

  /**
   * Guarda el nuevo legajo mediante la fachada.
   */
  guardar(event: Event): void {
    event.preventDefault();

    if (!this.formularioValido || this.guardando) {
      return;
    }

    this.guardando = true;
    this.error = '';

    this.legajosFacade.crear({
      titulo: this.titulo.trim(),
      descripcion: this.descripcion.trim() || null,
      categoriaId: this.categoriaId
    }).subscribe({
      next: () => {
        this.router.navigate(['/legajos']);
      },
      error: (error: Error) => {
        this.error = error.message ||
          'No fue posible guardar el legajo.';
        this.guardando = false;
      }
    });
  }
}
