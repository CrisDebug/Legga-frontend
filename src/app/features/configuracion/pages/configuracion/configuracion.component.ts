import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import {
  Users,
  ShieldCheck,
  UserRound,
  CheckCircle2,
  CircleX,
  Info
} from 'lucide-angular';

import {
  USUARIOS_CONFIGURACION_MOCK,
  PERFILES_CONFIGURACION_MOCK,
  MATRIZ_PERMISOS_CONFIGURACION_MOCK
} from '../../data/configuracion.mock';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [
    LucideAngularModule
  ],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent {

  // Iconos utilizados en la pantalla
  readonly iconos = {
    Users,
    ShieldCheck,
    UserRound,
    CheckCircle2,
    CircleX,
    Info
  };

  // Pestaña seleccionada inicialmente
  pestanaActiva: 'usuarios' | 'permisos' = 'usuarios';

  // Datos de demostración
  readonly usuarios = USUARIOS_CONFIGURACION_MOCK;
  readonly perfiles = PERFILES_CONFIGURACION_MOCK;
  readonly matrizPermisos = MATRIZ_PERMISOS_CONFIGURACION_MOCK;

  // Cantidad de usuarios activos
  get usuariosActivos(): number {
    return this.usuarios.filter(
      item => item.usuario.activo
    ).length;
  }

  // Cambiar entre las pestañas de configuración
  cambiarPestana(pestana: 'usuarios' | 'permisos'): void {
    this.pestanaActiva = pestana;
  }
}