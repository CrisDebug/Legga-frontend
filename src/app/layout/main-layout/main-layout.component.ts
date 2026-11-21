
import { Component, OnInit, inject } from '@angular/core';
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

import {
  IdentidadService,
  ContextoIdentidad
} from '../../core/services/identidad.service';

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
export class MainLayoutComponent implements OnInit {

  private readonly identidadService = inject(IdentidadService);

  // ==================================================
  // 1. ESTADO DEL MENÚ
  // ==================================================

  menuAbierto = false;

  // ==================================================
  // 2. CONTEXTO DEL USUARIO AUTENTICADO
  // ==================================================

  contextoIdentidad: ContextoIdentidad | null = null;

  cargandoIdentidad = false;

  errorIdentidad: string | null = null;

  // ==================================================
  // 3. ICONOGRAFÍA DEL MENÚ
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
  // 4. OPCIONES PRINCIPALES DE NAVEGACIÓN
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
  // 5. OPCIÓN DE PERFIL
  // ==================================================

  readonly opcionPerfil = {
    etiqueta: 'Mi perfil',
    ruta: '/perfil',
    icono: 'UserRound'
  };

  // ==================================================
  // 6. INICIALIZACIÓN DEL COMPONENTE
  // ==================================================

  ngOnInit(): void {
    this.cargarContextoIdentidad();
  }

  // ==================================================
  // 7. CONSULTAR IDENTIDAD MEDIANTE EL BFF
  // ==================================================

  cargarContextoIdentidad(): void {

    this.cargandoIdentidad = true;
    this.errorIdentidad = null;

    this.identidadService.consultarContexto().subscribe({

      next: (contexto) => {
        this.contextoIdentidad = contexto;
        this.cargandoIdentidad = false;

        console.log('Contexto de identidad LEGGA:', contexto);
      },

      error: (error) => {
        this.errorIdentidad = 'No fue posible obtener el contexto de identidad.';
        this.cargandoIdentidad = false;

        console.error('Error al consultar identidad LEGGA:', error);
      }

    });
  }

  // ==================================================
  // 8. COMPROBAR PERMISOS FUNCIONALES
  // ==================================================

  tienePermiso(codigo: string): boolean {

    if (!this.contextoIdentidad) {
      return false;
    }

    return this.identidadService.tienePermiso(
      this.contextoIdentidad,
      codigo
    );
  }

  // ==================================================
  // 9. CONTROL DEL MENÚ MÓVIL
  // ==================================================

  alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  // ==================================================
  // 10. OBTENER ICONOS DINÁMICAMENTE
  // ==================================================

  obtenerIcono(nombre: string) {
    return this.iconos[nombre as keyof typeof this.iconos];
  }

}
