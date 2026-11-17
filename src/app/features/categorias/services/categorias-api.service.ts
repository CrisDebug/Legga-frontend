
import { Injectable, inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiClientService } from '../../../core/http/api-client.service';

import {
  CategoriaApiDTO,
  CreateCategoriaRequest
} from '../../../core/models/categoria-api.model';

import { PageApiDTO } from '../../../core/models/page-api.model';

export interface CategoriasQueryParams {
  activa?: boolean;
  page?: number;
  size?: number;
}

@Injectable({ providedIn: 'root' })
export class CategoriasApiService {
  private readonly api = inject(ApiClientService);

  listar(params?: CategoriasQueryParams): Observable<PageApiDTO<CategoriaApiDTO>> {
    let httpParams = new HttpParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }

    return this.api.get<PageApiDTO<CategoriaApiDTO>>(
      '/api/v1/categorias',
      httpParams
    );
  }

  obtenerPorId(categoriaId: string): Observable<CategoriaApiDTO> {
    return this.api.get<CategoriaApiDTO>(
      `/api/v1/categorias/${categoriaId}`
    );
  }

  crear(request: CreateCategoriaRequest): Observable<CategoriaApiDTO> {
    return this.api.post<CategoriaApiDTO, CreateCategoriaRequest>(
      '/api/v1/categorias',
      request
    );
  }
}
