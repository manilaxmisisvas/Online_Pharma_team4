package com.team4.onlinepharma_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.team4.onlinepharma_backend.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
}