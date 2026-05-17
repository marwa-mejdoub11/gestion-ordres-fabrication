import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employe {
  id?: number;
  nom: string;
  poste: string;
  machineAssignee?: { id: number; nom?: string; etat?: string };
}

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = '/api/employes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employe[]> {
    return this.http.get<Employe[]>(this.apiUrl);
  }

  create(employe: Employe): Observable<Employe> {
    return this.http.post<Employe>(this.apiUrl, employe);
  }

  update(id: number, employe: Employe): Observable<Employe> {
    return this.http.put<Employe>(`${this.apiUrl}/${id}`, employe);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}