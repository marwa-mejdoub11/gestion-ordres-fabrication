package com.fabrication.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "ordres_fabrication")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdreFabrication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projet;

    @ManyToOne
    @JoinColumn(name = "produit_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Produit produit;

    @Min(value = 1, message = "La quantité doit être supérieure à 0")
    private Integer quantite;

    private LocalDate date;

    private String etat; // EN_ATTENTE, EN_COURS, TERMINE, ANNULE
}