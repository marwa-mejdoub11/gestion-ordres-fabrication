import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeService, Employe } from '../../services/employe';
import { MachineService, Machine } from '../../services/machine';

@Component({
  selector: 'app-employes',
  imports: [CommonModule, FormsModule],
  templateUrl: './employes.html',
  styleUrl: './employes.scss'
})
export class Employes implements OnInit {
  employes: Employe[] = [];
  machines: Machine[] = [];
  machinesDisponibles: Machine[] = []; // Nouvelle propriété
  newEmploye: Employe = { nom: '', poste: '' };
  editMode = false;
  editId: number | null = null;
  selectedMachineId: number | null = null;

  constructor(
    private employeService: EmployeService,
    private machineService: MachineService
  ) {}

  ngOnInit() {
    this.load();
    this.loadMachines();
  }

  load() {
    this.employeService.getAll().subscribe(data => this.employes = data);
  }

  loadMachines() {
    this.machineService.getAll().subscribe(data => {
      this.machines = data;
      // Filtrer uniquement les machines disponibles
      this.machinesDisponibles = data.filter(m => m.etat === 'DISPONIBLE');
    });
  }

  save() {
    if (this.selectedMachineId) {
      this.newEmploye.machineAssignee = { id: this.selectedMachineId };
    }
    if (this.editMode && this.editId) {
      this.employeService.update(this.editId, this.newEmploye).subscribe(() => {
        this.load(); this.reset();
      });
    } else {
      this.employeService.create(this.newEmploye).subscribe(() => {
        this.load(); this.reset();
      });
    }
  }

  edit(e: Employe) {
    this.editMode = true;
    this.editId = e.id!;
    this.newEmploye = { ...e };
    this.selectedMachineId = e.machineAssignee?.id || null;
  }

confirmDelete(id: number) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
    this.employeService.delete(id).subscribe(() => this.load());
  }
}

  reset() {
    this.newEmploye = { nom: '', poste: '' };
    this.editMode = false;
    this.editId = null;
    this.selectedMachineId = null;
  }
}