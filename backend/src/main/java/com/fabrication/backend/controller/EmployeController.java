package com.fabrication.backend.controller;

import com.fabrication.backend.entity.Employe;
import com.fabrication.backend.service.EmployeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employes")
@CrossOrigin(origins = "*")
public class EmployeController {

    @Autowired
    private EmployeService employeService;

    @GetMapping
    public List<Employe> getAll() {
        return employeService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employe> getById(@PathVariable Long id) {
        return ResponseEntity.ok(employeService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Employe> create(@Valid @RequestBody Employe employe) {
        return ResponseEntity.ok(employeService.create(employe));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employe> update(@PathVariable Long id, @Valid @RequestBody Employe employe) {
        return ResponseEntity.ok(employeService.update(id, employe));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}