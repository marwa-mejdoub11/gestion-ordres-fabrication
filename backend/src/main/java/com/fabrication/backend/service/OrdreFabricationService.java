package com.fabrication.backend.service;

import com.fabrication.backend.entity.OrdreFabrication;
import com.fabrication.backend.repository.OrdreFabricationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrdreFabricationService {

    @Autowired
    private OrdreFabricationRepository ordreRepository;

    public List<OrdreFabrication> getAll() {
        return ordreRepository.findAll();
    }

    public OrdreFabrication getById(Long id) {
        return ordreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ordre non trouvé"));
    }

    public OrdreFabrication create(OrdreFabrication ordre) {
        return ordreRepository.save(ordre);
    }

    public OrdreFabrication update(Long id, OrdreFabrication ordre) {
        OrdreFabrication existing = getById(id);
        existing.setProjet(ordre.getProjet());
        existing.setProduit(ordre.getProduit());
        existing.setQuantite(ordre.getQuantite());
        existing.setDate(ordre.getDate());
        existing.setEtat(ordre.getEtat());
        return ordreRepository.save(existing);
    }

    public void delete(Long id) {
        ordreRepository.deleteById(id);
    }
}