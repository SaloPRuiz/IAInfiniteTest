import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private securityApiUrl = 'http://127.0.0.1:3000';
  private clientsApiUrl = 'http://127.0.0.1:4000';

  constructor(private http: HttpClient) {}

  private getSecurityApiUrl(endpoint: string): string {
    return `${this.securityApiUrl}/${endpoint}`;
  }

  private getClientsApiUrl(endpoint: string): string {
    return `${this.clientsApiUrl}/${endpoint}`;
  }

  generarToken(): Observable<any> {
    const endpoint = 'generar-token';
    const url = this.getSecurityApiUrl(endpoint);
    return this.http.get<any>(url);
  }

  validarToken(token: string): Observable<any> {
    const endpoint = 'consultar-token';
    const url = this.getSecurityApiUrl(endpoint);
    return this.http.post<any>(url, { token });
  }

  registrarCliente(client: any): Observable<any> {
    const endpoint = 'cliente';
    const url = this.getClientsApiUrl(endpoint);
    return this.http.post<any>(url, { client });
  }
}
