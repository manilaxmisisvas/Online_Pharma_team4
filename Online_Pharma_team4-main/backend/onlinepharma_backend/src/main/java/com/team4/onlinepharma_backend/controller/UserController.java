package com.team4.onlinepharma_backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.team4.onlinepharma_backend.dao.UserDao;
import com.team4.onlinepharma_backend.model.User;

@CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    //http://localhost:8080/api/user/profile
    @GetMapping("/profile")
    public ResponseEntity<User> getOwnProfile(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        Optional<User> user = userDao.findByEmail(email);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //http://localhost:8080/api/user/update
    @PutMapping("/update")
    public ResponseEntity<User> updateOwnProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody User updatedData) {
        String email = userDetails.getUsername();
        Optional<User> userOpt = userDao.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setName(updatedData.getName());
            user.setMobile(updatedData.getMobile());
            user.setGender(updatedData.getGender());
            user.setDob(updatedData.getDob());
            user.setAddress(updatedData.getAddress());

            if (updatedData.getPassword() != null && !updatedData.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(updatedData.getPassword()));
            }

            User updatedUser = userDao.saveUser(user);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //http://localhost:8080/api/user/delete
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteOwnProfile(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        Optional<User> userOpt = userDao.findByEmail(email);
        if (userOpt.isPresent()) {
            userDao.deleteUser(userOpt.get().getId());
            return ResponseEntity.ok("Your account has been deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}