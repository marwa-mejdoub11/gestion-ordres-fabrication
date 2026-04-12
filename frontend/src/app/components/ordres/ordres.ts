import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdreService, Ordre } from '../../services/ordre';
import { ProduitService, Produit } from '../../services/produit';

@Component({
  selector: 'app-ordres',
  imports: [CommonModule, FormsModule],
  templateUrl: './ordres.html',
  styleUrl: './ordres.scss'
})
export class Ordres implements OnInit {
  ordres: Ordre[] = [];
  produits: Produit[] = [];
  newOrdre: Ordre = { projet: '', quantite: 1, date: '', etat: 'EN_ATTENTE' };
  editMode = false;
  editId: number | null = null;
  selectedProduitId: number | null = null;

  constructor(
    private ordreService: OrdreService,
    private produitService: ProduitService
  ) {}

  ngOnInit() {
    this.load();
    this.produitService.getAll().subscribe(data => this.produits = data);
  }

  load() {
    this.ordreService.getAll().subscribe(data => this.ordres = data);
  }

  save() {
    if (this.selectedProduitId) {
      this.newOrdre.produit = { id: this.selectedProduitId };
    }
    if (this.editMode && this.editId) {
      this.ordreService.update(this.editId, this.newOrdre).subscribe(() => {
        this.load(); this.reset();
      });
    } else {
      this.ordreService.create(this.newOrdre).subscribe(() => {
        this.load(); this.reset();
      });
    }
  }

  edit(o: Ordre) {
    this.editMode = true;
    this.editId = o.id!;
    this.newOrdre = { ...o };
    this.selectedProduitId = o.produit?.id || null;
  }

  delete(id: number) {
    this.ordreService.delete(id).subscribe(() => this.load());
  }

  reset() {
    this.newOrdre = { projet: '', quantite: 1, date: '', etat: 'EN_ATTENTE' };
    this.editMode = false;
    this.editId = null;
    this.selectedProduitId = null;
  }
}