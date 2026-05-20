package com.fabrication.backend.controller;

import com.fabrication.backend.entity.Produit;
import com.fabrication.backend.service.ProduitService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "*")
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @GetMapping
    public List<Produit> getAll() {
        return produitService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produit> getById(@PathVariable Long id) {
        return ResponseEntity.ok(produitService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Produit> create(@Valid @RequestBody Produit produit) {
        return ResponseEntity.ok(produitService.create(produit));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produit> update(@PathVariable Long id, @Valid @RequestBody Produit produit) {
        return ResponseEntity.ok(produitService.update(id, produit));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            produitService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            // Si erreur de clé étrangère, renvoyer un message clair
            String errorMessage = e.getMessage();
            if (errorMessage != null && (errorMessage.contains("foreign key constraint") || errorMessage.contains("Cannot delete"))) {
                return ResponseEntity.badRequest()
                    .body("Impossible de supprimer ce produit car il est utilisé dans des ordres de fabrication. Supprimez d'abord les ordres liés.");
            }
            return ResponseEntity.badRequest().body("Erreur lors de la suppression: " + errorMessage);
        }
    }
}