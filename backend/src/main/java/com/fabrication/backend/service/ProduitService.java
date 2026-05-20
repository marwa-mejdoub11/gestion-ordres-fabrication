package com.fabrication.backend.service;

import com.fabrication.backend.entity.Produit;
import com.fabrication.backend.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    public List<Produit> getAll() {
        return produitRepository.findAll();
    }

    public Produit getById(Long id) {
        return produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
    }

    public Produit create(Produit produit) {
        return produitRepository.save(produit);
    }

    public Produit update(Long id, Produit produit) {
        Produit existing = getById(id);
        existing.setNom(produit.getNom());
        existing.setType(produit.getType());
        existing.setStock(produit.getStock());
        existing.setFournisseur(produit.getFournisseur());
        return produitRepository.save(existing);
    }

    public void delete(Long id) {
        // Vérifier si le produit existe
        Produit produit = getById(id);
        
        // Note : Si le produit est utilisé dans des ordres, MySQL retournera une erreur
        // C'est voulu pour protéger l'intégrité des données
        produitRepository.deleteById(id);
    }
}
