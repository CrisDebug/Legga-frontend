
// Importaciones principales de Angular.
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom
} from '@angular/core';

// Importaciones para rutas y solicitudes HTTP.
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

// Importaciones de rutas e íconos Lucide.
import { routes } from './app.routes';
import { LucideAngularModule, LayoutDashboard } from 'lucide-angular';

// Configuración global de la aplicación LEGGA.
export const appConfig: ApplicationConfig = {
  providers: [

    // Configura la detección de cambios de Angular.
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Registra las rutas de navegación.
    provideRouter(routes),

    // Habilita las solicitudes HTTP.
    provideHttpClient(),

    // Registra el ícono del panel principal de Lucide.
    importProvidersFrom(
      LucideAngularModule.pick({ LayoutDashboard })
    )
  ]
};
