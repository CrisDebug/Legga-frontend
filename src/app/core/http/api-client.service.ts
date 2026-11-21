
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private readonly http = inject(HttpClient);

  readonly baseUrl = environment.apiUrl;

  private readonly opciones = {
    withCredentials: true
  };

  get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(
      `${this.baseUrl}${path}`,
      { ...this.opciones, params }
    );
  }

  post<TResponse, TRequest>(
    path: string,
    body: TRequest
  ): Observable<TResponse> {
    return this.http.post<TResponse>(
      `${this.baseUrl}${path}`,
      body,
      this.opciones
    );
  }

  put<TResponse, TRequest>(
    path: string,
    body: TRequest
  ): Observable<TResponse> {
    return this.http.put<TResponse>(
      `${this.baseUrl}${path}`,
      body,
      this.opciones
    );
  }

  patch<TResponse, TRequest>(
    path: string,
    body: TRequest
  ): Observable<TResponse> {
    return this.http.patch<TResponse>(
      `${this.baseUrl}${path}`,
      body,
      this.opciones
    );
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(
      `${this.baseUrl}${path}`,
      this.opciones
    );
  }
}
