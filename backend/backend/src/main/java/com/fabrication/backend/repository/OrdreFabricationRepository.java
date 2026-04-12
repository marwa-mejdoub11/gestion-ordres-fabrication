package com.fabrication.backend.repository;

import com.fabrication.backend.entity.OrdreFabrication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdreFabricationRepository extends JpaRepository<OrdreFabrication, Long> {
}