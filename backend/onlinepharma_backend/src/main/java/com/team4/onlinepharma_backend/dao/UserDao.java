package com.team4.onlinepharma_backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team4.onlinepharma_backend.model.User;
import com.team4.onlinepharma_backend.repo.UserRepository;

@Repository
public class UserDao {

    @Autowired
    private UserRepository userRepo;

    public User save(User user) {
        return userRepo.save(user);
    }

    public Optional<User> findById(Long id) {
        return userRepo.findById(id);
    }

    public List<User> findAll() {
        return userRepo.findAll();
    }
}