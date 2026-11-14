import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pantalla-pendiente',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="pagina-pendiente">
      <a class="volver" routerLink="/legajos">← Volver a legajos</a>
      <h1>{{ titulo }}</h1>
      <p>Pantalla en construcción.</p>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      color: #49352D;
      font-family: 'Nunito Sans', sans-serif;
    }

    .pagina-pendiente {
      max-width: 820px;
      margin: 0 auto;
    }

    .volver {
      display: inline-block;
      margin-bottom: 24px;
      color: #873F2B;
      font-size: 14px;
      text-decoration: none;
    }

    h1 {
      margin: 0 0 16px;
      font-size: 28px;
      font-weight: 800;
    }

    p {
      font-size: 14px;
    }
  `]
})
export class PantallaPendienteComponent {
  readonly titulo: string;

  constructor(route: ActivatedRoute) {
    this.titulo = route.snapshot.data['titulo'] ?? 'Pantalla en construcción';
  }
}
