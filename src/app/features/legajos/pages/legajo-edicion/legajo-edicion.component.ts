
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { LegajosDataFacade } from '../../facade/legajos-data.facade';

/**
 * Pantalla para editar un legajo existente.
 *
 * Obtiene los datos mediante LegajosDataFacade,
 * precarga el formulario y actualiza el registro.
 */
@Component({
  selector: 'app-legajo-edicion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './legajo-edicion.component.html',
  styleUrl: './legajo-edicion.component.css'
})
export class LegajoEdicionComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly legajosFacade = inject(LegajosDataFacade);

  // Identificador del legajo que se está editando.
  legajoId = '';

  // Datos del formulario.
  titulo = '';
  descripcion = '';
  categoriaId = '';

  // Categorías disponibles.
  categorias: { id: string; nombre: string }[] = [];

  // Estados de pantalla.
  cargando = true;
  guardando = false;
  error = '';

  ngOnInit(): void {
    this.categorias = this.legajosFacade.obtenerCategorias();

    this.legajoId = this.route.snapshot.paramMap.get('id') ?? '';

    if (!this.legajoId) {
      this.error = 'No se especificó el identificador del legajo.';
      this.cargando = false;
      return;
    }

    this.cargarLegajo();
  }

  /**
   * Obtiene los datos actuales del legajo.
   */
  private cargarLegajo(): void {
    this.legajosFacade.obtenerPorId(this.legajoId).subscribe({
      next: (legajo) => {
        this.titulo = legajo.titulo;
        this.descripcion = legajo.descripcion ?? '';
        this.categoriaId = legajo.categoriaId;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No fue posible cargar el legajo solicitado.';
        this.cargando = false;
      }
    });
  }

  /**
   * Valida el título.
   */
  get tituloValido(): boolean {
    return this.titulo.trim().length > 0 &&
      this.titulo.trim().length <= 150;
  }

  /**
   * Comprueba la validez general del formulario.
   */
  get formularioValido(): boolean {
    return this.tituloValido &&
      this.categoriaId !== '' &&
      this.descripcion.length <= 500;
  }

  /**
   * Guarda los cambios del legajo.
   */
  guardar(event: Event): void {
    event.preventDefault();

    if (!this.formularioValido || this.guardando) {
      return;
    }

    this.guardando = true;
    this.error = '';

    this.legajosFacade.actualizar(this.legajoId, {
      titulo: this.titulo.trim(),
      descripcion: this.descripcion.trim() || null,
      categoriaId: this.categoriaId
    }).subscribe({
      next: () => {
        this.router.navigate(['/legajos', this.legajoId]);
      },
      error: (error: Error) => {
        this.error = error.message ||
          'No fue posible actualizar el legajo.';
        this.guardando = false;
      }
    });
  }
}
