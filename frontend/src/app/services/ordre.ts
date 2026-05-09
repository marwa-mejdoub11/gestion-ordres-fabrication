import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ordre {
  id?: number;
  projet: string;
  produit?: { id: number; nom?: string };
  quantite: number;
  date: string;
  etat: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrdreService {
  private apiUrl = 'http://localhost:8080/api/ordres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ordre[]> {
    return this.http.get<Ordre[]>(this.apiUrl);
  }

  create(ordre: Ordre): Observable<Ordre> {
    return this.http.post<Ordre>(this.apiUrl, ordre);
  }

  update(id: number, ordre: Ordre): Observable<Ordre> {
    return this.http.put<Ordre>(`${this.apiUrl}/${id}`, ordre);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}