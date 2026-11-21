
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import { ApiClientService } from '../http/api-client.service';

// =====================================================
// 1. MODELO DE PERMISO FUNCIONAL
// =====================================================

export interface PermisoIdentidad {
  codigo: string;
  permitido: boolean;
}

// =====================================================
// 2. MODELO DEL CONTEXTO DE IDENTIDAD
// =====================================================

export interface ContextoIdentidad {
  usuarioId: string;
  correo: string;
  nombre: string;
  activo: boolean;

  institucionId: string;
  institucionCodigo: string;
  institucionNombre: string;

  perfilId: string;
  perfilCodigo: string;
  perfilNombre: string;

  permisos: PermisoIdentidad[];
}

// =====================================================
// 3. SERVICIO DE IDENTIDAD
// =====================================================

@Injectable({
  providedIn: 'root'
})
export class IdentidadService {

  private readonly api = inject(ApiClientService);

  // Caché compartida del contexto autenticado.
  private contextoCache$?: Observable<ContextoIdentidad>;

  // ===================================================
  // CONSULTAR CONTEXTO DEL USUARIO AUTENTICADO
  // ===================================================

  consultarContexto(): Observable<ContextoIdentidad> {

    if (!this.contextoCache$) {
      this.contextoCache$ = this.api
        .get<ContextoIdentidad>('/api/v1/identidad/contexto')
        .pipe(
          shareReplay({
            bufferSize: 1,
            refCount: false
          })
        );
    }

    return this.contextoCache$;
  }

  // ===================================================
  // COMPROBAR PERMISOS FUNCIONALES
  // ===================================================

  tienePermiso(
    contexto: ContextoIdentidad,
    codigo: string
  ): boolean {

    return contexto.permisos.some(
      permiso =>
        permiso.codigo === codigo &&
        permiso.permitido
    );
  }
}
