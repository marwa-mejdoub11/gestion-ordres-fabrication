package com.fabrication.backend.service;

import com.fabrication.backend.entity.Machine;
import com.fabrication.backend.repository.MachineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MachineService {

    @Autowired
    private MachineRepository machineRepository;

    public List<Machine> getAll() {
        return machineRepository.findAll();
    }

    public Machine getById(Long id) {
        return machineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Machine non trouvée"));
    }

    public Machine create(Machine machine) {
        return machineRepository.save(machine);
    }

    public Machine update(Long id, Machine machine) {
        Machine existing = getById(id);
        existing.setNom(machine.getNom());
        existing.setEtat(machine.getEtat());
        existing.setDerniereMaintenance(machine.getDerniereMaintenance());
        return machineRepository.save(existing);
    }

    public void delete(Long id) {
        machineRepository.deleteById(id);
    }
}