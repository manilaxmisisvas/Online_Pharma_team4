package com.team4.onlinepharma_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team4.onlinepharma_backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    boolean existsByEmail(String email);

    // Get all users by role (admin/user)
    List<User> findByRole(String role);

    // Get all disabled users
    List<User> findByDisabled(boolean disabled);
}
