import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MachineService, Machine } from '../../services/machine';

@Component({
  selector: 'app-machines',
  imports: [CommonModule, FormsModule],
  templateUrl: './machines.html',
  styleUrl: './machines.scss'
})
export class Machines implements OnInit {
  machines: Machine[] = [];
  newMachine: Machine = { nom: '', etat: '', derniereMaintenance: '' };
  editMode = false;
  editId: number | null = null;

  constructor(private machineService: MachineService) {}

  ngOnInit() { this.load(); }

  load() {
    this.machineService.getAll().subscribe(data => this.machines = data);
  }

  save() {
    if (this.editMode && this.editId) {
      this.machineService.update(this.editId, this.newMachine).subscribe(() => {
        this.load(); this.reset();
      });
    } else {
      this.machineService.create(this.newMachine).subscribe(() => {
        this.load(); this.reset();
      });
    }
  }

  edit(m: Machine) {
    this.editMode = true;
    this.editId = m.id!;
    this.newMachine = { ...m };
  }

  delete(id: number) {
    this.machineService.delete(id).subscribe(() => this.load());
  }

  reset() {
    this.newMachine = { nom: '', etat: '', derniereMaintenance: '' };
    this.editMode = false;
    this.editId = null;
  }
}