package com.fabrication.backend.service;

import com.fabrication.backend.entity.Employe;
import com.fabrication.backend.repository.EmployeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeService {

    @Autowired
    private EmployeRepository employeRepository;

    public List<Employe> getAll() {
        return employeRepository.findAll();
    }

    public Employe getById(Long id) {
        return employeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employé non trouvé"));
    }

    public Employe create(Employe employe) {
        return employeRepository.save(employe);
    }

    public Employe update(Long id, Employe employe) {
        Employe existing = getById(id);
        existing.setNom(employe.getNom());
        existing.setPoste(employe.getPoste());
        existing.setMachineAssignee(employe.getMachineAssignee());
        return employeRepository.save(existing);
    }

    public void delete(Long id) {
        employeRepository.deleteById(id);
    }
}