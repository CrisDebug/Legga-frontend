import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-legajo-formulario',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './legajo-formulario.component.html',
  styleUrl: './legajo-formulario.component.css'
})
export class LegajoFormularioComponent {
  titulo = '';
  descripcion = '';

  get tituloValido(): boolean {
    return this.titulo.trim().length > 0;
  }
}
