import { Routes } from '@angular/router';
import { LoginInvertidoComponent } from './login-invertido/login-invertido.component';
import { LoginEleganteComponent } from './login-elegante/login-elegante.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LegajosListaComponent } from './features/legajos/pages/legajos-lista/legajos-lista.component';
import { LegajoFormularioComponent } from './features/legajos/pages/legajo-formulario/legajo-formulario.component';
import { PantallaPendienteComponent } from './features/compartido/pages/pantalla-pendiente/pantalla-pendiente.component';
import { CategoriasListaComponent } from './features/categorias/pages/categorias-lista/categorias-lista.component';
import { TrazabilidadListaComponent } from './features/trazabilidad/pages/trazabilidad-lista/trazabilidad-lista.component';

export const routes: Routes = [
  { path: 'login-invertido', component: LoginInvertidoComponent },
  { path: 'login-elegante', component: LoginEleganteComponent },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'legajos', component: LegajosListaComponent },
      { path: 'legajos/nuevo', component: LegajoFormularioComponent },
      { path: 'legajos/:id/editar', component: PantallaPendienteComponent, data: { titulo: 'Editar legajo' } },
      { path: 'legajos/:id', component: PantallaPendienteComponent, data: { titulo: 'Detalle de legajo' } },
      { path: 'categorias', component: CategoriasListaComponent },
      { path: 'auditoria', component: TrazabilidadListaComponent },
      { path: '', redirectTo: 'legajos', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'legajos' }
];


