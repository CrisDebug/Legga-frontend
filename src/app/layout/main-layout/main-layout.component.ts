
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  menuAbierto = false;

  readonly opcionesMenu = [
    { etiqueta: 'Panel principal', ruta: '/dashboard' },
    { etiqueta: 'Legajos', ruta: '/legajos' },
    { etiqueta: 'Categorías', ruta: '/categorias' },
    { etiqueta: 'Usuarios', ruta: '/usuarios' },
    { etiqueta: 'Notificaciones', ruta: '/notificaciones' },
    { etiqueta: 'Trazabilidad', ruta: '/auditoria' }
  ];

  alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }
}

