
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

  get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, { params });
  }

  post<TResponse, TRequest>(
    path: string,
    body: TRequest
  ): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.baseUrl}${path}`, body);
  }

  put<TResponse, TRequest>(
    path: string,
    body: TRequest
  ): Observable<TResponse> {
    return this.http.put<TResponse>(`${this.baseUrl}${path}`, body);
  }

  patch<TResponse, TRequest>(
    path: string,
    body: TRequest
  ): Observable<TResponse> {
    return this.http.patch<TResponse>(`${this.baseUrl}${path}`, body);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`);
  }
}
