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
  errorMessage: string = ''; // Nouveau : pour afficher les erreurs

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
    this.errorMessage = ''; // Réinitialiser le message d'erreur
    if (this.selectedProduitId) {
      this.newOrdre.produit = { id: this.selectedProduitId };
    }
    if (this.editMode && this.editId) {
      this.ordreService.update(this.editId, this.newOrdre).subscribe({
        next: () => {
          this.load(); 
          this.reset();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || err.error || 'Erreur lors de la modification';
          console.error('Erreur:', err);
        }
      });
    } else {
      this.ordreService.create(this.newOrdre).subscribe({
        next: () => {
          this.load(); 
          this.reset();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || err.error || 'Erreur lors de la création';
          console.error('Erreur:', err);
        }
      });
    }
  }

  edit(o: Ordre) {
    this.editMode = true;
    this.editId = o.id!;
    this.newOrdre = { ...o };
    this.selectedProduitId = o.produit?.id || null;
  }

confirmDelete(id: number) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
    this.ordreService.delete(id).subscribe(() => this.load());
  }
}

  reset() {
    this.newOrdre = { projet: '', quantite: 1, date: '', etat: 'EN_ATTENTE' };
    this.editMode = false;
    this.editId = null;
    this.selectedProduitId = null;
    this.errorMessage = ''; // Réinitialiser le message d'erreur
  }
}