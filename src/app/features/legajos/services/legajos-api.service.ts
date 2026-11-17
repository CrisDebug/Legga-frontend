
import { Injectable, inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiClientService } from '../../../core/http/api-client.service';

import {
  LegajoApiDTO,
  CreateLegajoRequest,
  UpdateLegajoRequest
} from '../../../core/models/legajo-api.model';

import { PageApiDTO } from '../../../core/models/page-api.model';

/**
 * Parámetros públicos de consulta de legajos.
 * Basados en el contrato BFF v1.2.
 */
export interface LegajosQueryParams {
  q?: string;
  categoriaId?: string;
  estado?: 'ACTIVO' | 'ARCHIVADO';
  page?: number;
  size?: number;
  sort?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LegajosApiService {
  private readonly api = inject(ApiClientService);

  /**
   * Lista y busca legajos con paginación.
   */
  listar(params?: LegajosQueryParams): Observable<PageApiDTO<LegajoApiDTO>> {
    let httpParams = new HttpParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }

    return this.api.get<PageApiDTO<LegajoApiDTO>>(
      '/api/v1/legajos',
      httpParams
    );
  }

  /**
   * Consulta el detalle de un legajo.
   */
  obtenerPorId(legajoId: string): Observable<LegajoApiDTO> {
    return this.api.get<LegajoApiDTO>(
      `/api/v1/legajos/${legajoId}`
    );
  }

  /**
   * Crea un legajo.
   */
  crear(request: CreateLegajoRequest): Observable<LegajoApiDTO> {
    return this.api.post<LegajoApiDTO, CreateLegajoRequest>(
      '/api/v1/legajos',
      request
    );
  }

  /**
   * Actualiza un legajo.
   */
  actualizar(
    legajoId: string,
    request: UpdateLegajoRequest
  ): Observable<LegajoApiDTO> {
    return this.api.put<LegajoApiDTO, UpdateLegajoRequest>(
      `/api/v1/legajos/${legajoId}`,
      request
    );
  }
}
