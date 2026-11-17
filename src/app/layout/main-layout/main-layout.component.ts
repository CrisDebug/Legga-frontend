
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  LucideAngularModule,
  House,
  Folder,
  Files,
  Tags,
  ClipboardCheck,
  History,
  Bell,
  Settings,
  UserRound,
  LogOut
} from 'lucide-angular';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    LucideAngularModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  // ==================================================
  // 1. ESTADO DEL MENÚ
  // ==================================================

  menuAbierto = false;

  // ==================================================
  // 2. ICONOGRAFÍA DEL MENÚ
  // ==================================================

  readonly iconos = {
    House,
    Folder,
    Files,
    Tags,
    ClipboardCheck,
    History,
    Bell,
    Settings,
    UserRound,
    LogOut
  };

  // ==================================================
  // 3. OPCIONES PRINCIPALES DE NAVEGACIÓN
  // ==================================================

  readonly opcionesMenu = [
    { etiqueta: 'Inicio', ruta: '/dashboard', icono: 'House' },
    { etiqueta: 'Legajos', ruta: '/legajos', icono: 'Folder' },
    { etiqueta: 'Documentos', ruta: '/documentos', icono: 'Files' },
    { etiqueta: 'Categorías', ruta: '/categorias', icono: 'Tags' },
    { etiqueta: 'Completitud documental', ruta: '/completitud', icono: 'ClipboardCheck' },
    { etiqueta: 'Trazabilidad', ruta: '/auditoria', icono: 'History' },
    { etiqueta: 'Notificaciones', ruta: '/notificaciones', icono: 'Bell' }
  ];

  // ==================================================
  // 4. OPCIÓN DE PERFIL
  // ==================================================

  readonly opcionPerfil = {
    etiqueta: 'Mi perfil',
    ruta: '/perfil',
    icono: 'UserRound'
  };

  // ==================================================
  // 5. CONTROL DEL MENÚ MÓVIL
  // ==================================================

  alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  // ==================================================
  // 6. OBTENER ICONOS DINÁMICAMENTE
  // ==================================================

  obtenerIcono(nombre: string) {
    return this.iconos[nombre as keyof typeof this.iconos];
  }
}
