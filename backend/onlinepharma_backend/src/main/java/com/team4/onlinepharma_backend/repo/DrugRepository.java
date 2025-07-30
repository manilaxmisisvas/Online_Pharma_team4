package com.team4.onlinepharma_backend.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team4.onlinepharma_backend.model.Drug;

public interface DrugRepository extends JpaRepository<Drug, Long> {

    Optional<Drug> findByName(String name);

    List<Drug> findByNameContainingIgnoreCase(String namePart);


}
