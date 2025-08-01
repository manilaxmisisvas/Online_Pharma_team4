package com.team4.onlinepharma_backend.repo;

import com.team4.onlinepharma_backend.model.Drug;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DrugRepository extends JpaRepository<Drug, Long> {

    List<Drug> findByBannedFalse();  // Spring Data JPA will implement this automatically

}
