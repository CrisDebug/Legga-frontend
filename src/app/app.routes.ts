
import { Routes } from '@angular/router';

// =====================================================
// LAYOUT PRINCIPAL
// =====================================================

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

// =====================================================
// AUTENTICACIÓN
// =====================================================

import { LoginInvertidoComponent } from './login-invertido/login-invertido.component';
import { LoginEleganteComponent } from './login-elegante/login-elegante.component';

// =====================================================
// ADMINISTRACIÓN
// =====================================================

import { DashboardComponent } from './features/administracion/pages/dashboard/dashboard.component';

// =====================================================
// GESTIÓN DE LEGAJOS
// =====================================================

import { LegajosListaComponent } from './features/legajos/pages/legajos-lista/legajos-lista.component';
import { LegajoFormularioComponent } from './features/legajos/pages/legajo-formulario/legajo-formulario.component';
import { LegajoDetalleComponent } from './features/legajos/pages/legajo-detalle/legajo-detalle.component';
import { LegajoEdicionComponent } from './features/legajos/pages/legajo-edicion/legajo-edicion.component';

// =====================================================
// GESTIÓN DOCUMENTAL
// =====================================================

import { DocumentosListaComponent } from './features/documentos/pages/documentos-lista/documentos-lista.component';

// =====================================================
// GESTIÓN DE CATEGORÍAS
// =====================================================

import { CategoriasListaComponent } from './features/categorias/pages/categorias-lista/categorias-lista.component';
import { CategoriaFormularioComponent } from './features/categorias/pages/categoria-formulario/categoria-formulario.component';
import { CategoriaAdministracionComponent } from './features/categorias/pages/categoria-administracion/categoria-administracion.component';

// =====================================================
// COMPLETITUD DOCUMENTAL (F-09)
// =====================================================

import { CompletitudListaComponent } from './features/completitud/pages/completitud-lista/completitud-lista.component';

// =====================================================
// TRAZABILIDAD
// =====================================================

import { TrazabilidadListaComponent } from './features/trazabilidad/pages/trazabilidad-lista/trazabilidad-lista.component';

// =====================================================
// NOTIFICACIONES (F-12)
// =====================================================

import { NotificacionesListaComponent } from './features/notificaciones/pages/notificaciones-lista/notificaciones-lista.component';

// =====================================================
// CONFIGURACIÓN
// =====================================================

import { ConfiguracionComponent } from './features/configuracion/pages/configuracion/configuracion.component';

// =====================================================
// CONFIGURACIÓN DE RUTAS
// =====================================================

export const routes: Routes = [

  // -------------------------------------------------
  // 1. AUTENTICACIÓN
  // -------------------------------------------------

  { path: 'login-invertido', component: LoginInvertidoComponent },
  { path: 'login-elegante', component: LoginEleganteComponent },

  // -------------------------------------------------
  // 2. ENTRADA PRINCIPAL
  // -------------------------------------------------

  { path: '', redirectTo: 'login-elegante', pathMatch: 'full' },

  // -------------------------------------------------
  // 3. APLICACIÓN PRINCIPAL
  // Todas estas pantallas utilizan el layout general.
  // -------------------------------------------------

  {
    path: '',
    component: MainLayoutComponent,

    children: [

      // Dashboard
      { path: 'dashboard', component: DashboardComponent },

      // -------------------------------------------------
      // GESTIÓN DE LEGAJOS (F-01 y F-02)
      // -------------------------------------------------

      { path: 'legajos', component: LegajosListaComponent },
      { path: 'legajos/nuevo', component: LegajoFormularioComponent },

      {
        path: 'legajos/:id/editar',
        component: LegajoEdicionComponent
      },

      {
        path: 'legajos/:id',
        component: LegajoDetalleComponent
      },

      // -------------------------------------------------
      // GESTIÓN DE CATEGORÍAS (F-03)
      // -------------------------------------------------

      { path: 'categorias/nueva', component: CategoriaFormularioComponent },

      {
        path: 'categorias/:id',
        component: CategoriaAdministracionComponent
      },

      { path: 'categorias', component: CategoriasListaComponent },

      // -------------------------------------------------
      // GESTIÓN DOCUMENTAL (F-04, F-05, F-06 y F-11)
      // -------------------------------------------------

      { path: 'documentos', component: DocumentosListaComponent },

      // -------------------------------------------------
      // COMPLETITUD DOCUMENTAL (F-09)
      // -------------------------------------------------

      { path: 'completitud', component: CompletitudListaComponent },

      // -------------------------------------------------
      // TRAZABILIDAD E HISTORIAL (F-08)
      // -------------------------------------------------

      { path: 'auditoria', component: TrazabilidadListaComponent },

      // -------------------------------------------------
      // NOTIFICACIONES (F-12)
      // -------------------------------------------------

      { path: 'notificaciones', component: NotificacionesListaComponent },

      // -------------------------------------------------
      // CONFIGURACIÓN
      // -------------------------------------------------

      { path: 'configuracion', component: ConfiguracionComponent }

    ]
  },

  // -------------------------------------------------
  // 4. RUTA DE RESPALDO
  // -------------------------------------------------

  { path: '**', redirectTo: 'login-elegante' }

];
