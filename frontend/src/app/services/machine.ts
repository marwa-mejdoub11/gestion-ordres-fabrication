import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Machine {
  id?: number;
  nom: string;
  etat: string;
  derniereMaintenance: string;
}

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private apiUrl = 'http://localhost:8080/api/machines';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.apiUrl);
  }

  create(machine: Machine): Observable<Machine> {
    return this.http.post<Machine>(this.apiUrl, machine);
  }

  update(id: number, machine: Machine): Observable<Machine> {
    return this.http.put<Machine>(`${this.apiUrl}/${id}`, machine);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}