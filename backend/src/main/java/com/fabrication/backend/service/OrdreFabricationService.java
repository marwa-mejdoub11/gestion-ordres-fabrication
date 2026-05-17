package com.fabrication.backend.service;

import com.fabrication.backend.entity.OrdreFabrication;
import com.fabrication.backend.entity.Produit;
import com.fabrication.backend.repository.OrdreFabricationRepository;
import com.fabrication.backend.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class OrdreFabricationService {

    @Autowired
    private OrdreFabricationRepository ordreRepository;

    @Autowired
    private ProduitRepository produitRepository;

    public List<OrdreFabrication> getAll() {
        return ordreRepository.findAll();
    }

    public OrdreFabrication getById(Long id) {
        return ordreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ordre non trouvé"));
    }

    @Transactional
    public OrdreFabrication create(OrdreFabrication ordre) {
        // Vérifier et diminuer le stock
        if (ordre.getProduit() != null && ordre.getProduit().getId() != null) {
            Produit produit = produitRepository.findById(ordre.getProduit().getId())
                    .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
            
            // Vérifier si le stock est suffisant
            if (produit.getStock() < ordre.getQuantite()) {
                throw new RuntimeException("Stock insuffisant. Stock disponible: " + produit.getStock() + ", Quantité demandée: " + ordre.getQuantite());
            }
            
            // Diminuer le stock
            produit.setStock(produit.getStock() - ordre.getQuantite());
            produitRepository.save(produit);
        }
        
        return ordreRepository.save(ordre);
    }

    @Transactional
    public OrdreFabrication update(Long id, OrdreFabrication ordre) {
        OrdreFabrication existing = getById(id);
        String oldEtat = existing.getEtat();
        String newEtat = ordre.getEtat();
        
        // Si l'ordre passe à ANNULE, remonter le stock
        if (!"ANNULE".equals(oldEtat) && "ANNULE".equals(newEtat)) {
            if (existing.getProduit() != null && existing.getProduit().getId() != null) {
                Produit produit = produitRepository.findById(existing.getProduit().getId())
                        .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
                
                // Remonter le stock
                produit.setStock(produit.getStock() + existing.getQuantite());
                produitRepository.save(produit);
            }
        }
        
        existing.setProjet(ordre.getProjet());
        existing.setProduit(ordre.getProduit());
        existing.setQuantite(ordre.getQuantite());
        existing.setDate(ordre.getDate());
        existing.setEtat(ordre.getEtat());
        return ordreRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        // Remonter le stock si l'ordre n'était pas annulé
        OrdreFabrication ordre = getById(id);
        if (!"ANNULE".equals(ordre.getEtat())) {
            if (ordre.getProduit() != null && ordre.getProduit().getId() != null) {
                Produit produit = produitRepository.findById(ordre.getProduit().getId())
                        .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
                
                // Remonter le stock
                produit.setStock(produit.getStock() + ordre.getQuantite());
                produitRepository.save(produit);
            }
        }
        
        ordreRepository.deleteById(id);
    }
}