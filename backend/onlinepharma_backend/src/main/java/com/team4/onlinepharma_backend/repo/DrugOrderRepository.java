package com.team4.onlinepharma_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team4.onlinepharma_backend.model.DrugOrder;

public interface DrugOrderRepository extends JpaRepository<DrugOrder, Long> {

    // Get all orders by user/member ID

	List<DrugOrder> findByUserId(Long userId);

  

  

   }

