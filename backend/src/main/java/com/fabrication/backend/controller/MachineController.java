package com.fabrication.backend.controller;

import com.fabrication.backend.entity.Machine;
import com.fabrication.backend.service.MachineService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/machines")
@CrossOrigin(origins = "*")
public class MachineController {

    @Autowired
    private MachineService machineService;

    @GetMapping
    public List<Machine> getAll() {
        return machineService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Machine> getById(@PathVariable Long id) {
        return ResponseEntity.ok(machineService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Machine> create(@Valid @RequestBody Machine machine) {
        return ResponseEntity.ok(machineService.create(machine));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Machine> update(@PathVariable Long id, @Valid @RequestBody Machine machine) {
        return ResponseEntity.ok(machineService.update(id, machine));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        machineService.delete(id);
        return ResponseEntity.noContent().build();
    }
}