import { Component, OnInit, inject } from '@angular/core';

import { DashboardService } from '../../services/dashboard.service';
import type { DashboardData } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  private readonly dashboardService = inject(DashboardService);

  dashboard: DashboardData | null = null;
  cargando = true;
  error: string | null = null;

  ngOnInit(): void {
    this.cargarDashboard();
  }

  private cargarDashboard(): void {
    this.cargando = true;
    this.error = null;

    this.dashboardService.obtenerDashboard().subscribe({
      next: (datos) => {
        this.dashboard = datos;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No fue posible cargar la información del panel.';
        this.cargando = false;
      }
    });
  }
}