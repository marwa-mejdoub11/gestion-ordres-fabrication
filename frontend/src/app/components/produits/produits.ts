import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitService, Produit } from '../../services/produit';

@Component({
  selector: 'app-produits',
  imports: [CommonModule, FormsModule],
  templateUrl: './produits.html',
  styleUrl: './produits.scss'
})
export class Produits implements OnInit {
  produits: Produit[] = [];
  newProduit: Produit = { nom: '', type: '', stock: 0, fournisseur: '' };
  editMode = false;
  editId: number | null = null;

  constructor(private produitService: ProduitService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.produitService.getAll().subscribe(data => this.produits = data);
  }

  save() {
    if (this.editMode && this.editId) {
      this.produitService.update(this.editId, this.newProduit).subscribe(() => {
        this.load();
        this.reset();
      });
    } else {
      this.produitService.create(this.newProduit).subscribe(() => {
        this.load();
        this.reset();
      });
    }
  }

  edit(p: Produit) {
    this.editMode = true;
    this.editId = p.id!;
    this.newProduit = { ...p };
  }

 confirmDelete(id: number) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
    this.produitService.delete(id).subscribe(() => this.load());
  }
}

  reset() {
    this.newProduit = { nom: '', type: '', stock: 0, fournisseur: '' };
    this.editMode = false;
    this.editId = null;
  }
}