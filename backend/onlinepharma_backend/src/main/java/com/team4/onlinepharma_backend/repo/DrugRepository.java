package com.team4.onlinepharma_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team4.onlinepharma_backend.model.Drug;

public interface DrugRepository extends JpaRepository<Drug, Long> {

    List<Drug> findByBannedFalse();  // Spring Data JPA will implement this automatically

}
