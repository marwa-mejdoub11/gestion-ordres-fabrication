package com.fabrication.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "machines")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Machine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @NotBlank(message = "L'état est obligatoire")
    private String etat; // DISPONIBLE, EN_PANNE, EN_MAINTENANCE

    private LocalDate derniereMaintenance;
}