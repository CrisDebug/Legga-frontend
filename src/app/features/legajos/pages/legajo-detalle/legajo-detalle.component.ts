
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { LegajoApiDTO } from '../../../../core/models/legajo-api.model';
import { LegajosDataFacade } from '../../facade/legajos-data.facade';

type PestanaDetalle = 'informacion' | 'documentos';

@Component({
  selector: 'app-legajo-detalle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './legajo-detalle.component.html',
  styleUrl: './legajo-detalle.component.css'
})
export class LegajoDetalleComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly legajosFacade = inject(LegajosDataFacade);

  // Información del legajo consultado.
  legajo: LegajoApiDTO | null = null;

  // Pestaña seleccionada.
  pestanaActiva: PestanaDetalle = 'informacion';

  // Estados de pantalla.
  cargando = true;
  error = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'No se especificó el identificador del legajo.';
      this.cargando = false;
      return;
    }

    this.legajosFacade.obtenerPorId(id).subscribe({
      next: (legajo) => {
        this.legajo = legajo;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No fue posible encontrar el legajo solicitado.';
        this.cargando = false;
      }
    });
  }

  /**
   * Cambia entre las pestañas de información y documentos.
   */
  cambiarPestana(pestana: PestanaDetalle): void {
    this.pestanaActiva = pestana;
  }

  /**
   * Formatea las fechas para su presentación.
   */
  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleString('es-CL', {
      dateStyle: 'long',
      timeStyle: 'short'
    });
  }
}
