import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../services/produit';
import { MachineService } from '../../services/machine';
import { EmployeService } from '../../services/employe';
import { OrdreService } from '../../services/ordre';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  totalProduits = 0;
  totalMachines = 0;
  totalEmployes = 0;
  totalOrdres = 0;
  ordresEnAttente = 0;
  ordresEnCours = 0;
  ordresTermines = 0;
  ordresAnnules = 0;
  machinesDisponibles = 0;
  machinesEnPanne = 0;
  machinesEnMaintenance = 0;

  constructor(
    private produitService: ProduitService,
    private machineService: MachineService,
    private employeService: EmployeService,
    private ordreService: OrdreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.produitService.getAll().subscribe({
      next: (data) => {
        this.totalProduits = data.length;
        this.cdr.detectChanges();
      }
    });

    this.machineService.getAll().subscribe({
      next: (data) => {
        this.totalMachines = data.length;
        this.machinesDisponibles = data.filter(m => m.etat === 'DISPONIBLE').length;
        this.machinesEnPanne = data.filter(m => m.etat === 'EN_PANNE').length;
        this.machinesEnMaintenance = data.filter(m => m.etat === 'EN_MAINTENANCE').length;
        this.cdr.detectChanges();
      }
    });

    this.employeService.getAll().subscribe({
      next: (data) => {
        this.totalEmployes = data.length;
        this.cdr.detectChanges();
      }
    });

    this.ordreService.getAll().subscribe({
      next: (data) => {
        this.totalOrdres = data.length;
        this.ordresEnAttente = data.filter(o => o.etat === 'EN_ATTENTE').length;
        this.ordresEnCours = data.filter(o => o.etat === 'EN_COURS').length;
        this.ordresTermines = data.filter(o => o.etat === 'TERMINE').length;
        this.ordresAnnules = data.filter(o => o.etat === 'ANNULE').length;
        this.cdr.detectChanges();
      }
    });
  }
}