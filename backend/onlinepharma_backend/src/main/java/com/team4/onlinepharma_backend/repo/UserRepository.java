package com.team4.onlinepharma_backend.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team4.onlinepharma_backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByName(String name);
    default Optional<User> findByEmailOrName(String input) {
        return findByEmail(input).or(() -> findByName(input));
    }
    
}