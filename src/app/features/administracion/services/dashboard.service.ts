
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { DashboardData } from '../models/dashboard.model';
import { DASHBOARD_MOCK } from '../data/dashboard.mock';

/**
 * Servicio de datos del Dashboard.
 *
 * Actualmente utiliza información ficticia.
 * Posteriormente se conectará al BFF mediante GraphQL.
 */
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  /**
   * Obtiene la información del panel.
   */
  obtenerDashboard(): Observable<DashboardData> {
    return of(DASHBOARD_MOCK);
  }
}
