package com.fabrication.backend.controller;

import com.fabrication.backend.entity.OrdreFabrication;
import com.fabrication.backend.service.OrdreFabricationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ordres")
@CrossOrigin(origins = "*")
public class OrdreFabricationController {

    @Autowired
    private OrdreFabricationService ordreService;

    @GetMapping
    public List<OrdreFabrication> getAll() {
        return ordreService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdreFabrication> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ordreService.getById(id));
    }

    @PostMapping
    public ResponseEntity<OrdreFabrication> create(@Valid @RequestBody OrdreFabrication ordre) {
        return ResponseEntity.ok(ordreService.create(ordre));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrdreFabrication> update(@PathVariable Long id, @Valid @RequestBody OrdreFabrication ordre) {
        return ResponseEntity.ok(ordreService.update(id, ordre));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        ordreService.delete(id);
        return ResponseEntity.noContent().build();
    }
}