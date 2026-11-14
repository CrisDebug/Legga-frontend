import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-legajos-lista',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './legajos-lista.component.html',
  styleUrl: './legajos-lista.component.css'
})
export class LegajosListaComponent {}
