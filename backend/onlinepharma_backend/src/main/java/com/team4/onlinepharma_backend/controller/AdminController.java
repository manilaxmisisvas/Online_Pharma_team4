package com.team4.onlinepharma_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.team4.onlinepharma_backend.dao.DrugDao;
import com.team4.onlinepharma_backend.dao.UserDao;
import com.team4.onlinepharma_backend.model.Drug;
import com.team4.onlinepharma_backend.model.User;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private DrugDao drugDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //http://localhost:8080/api/admin/users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userDao.findAllUsers();
        return ResponseEntity.ok(users);
    }

  //http://localhost:8080/api/admin/user
    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return new ResponseEntity<>(userDao.saveUser(user), HttpStatus.CREATED);
    }
    
    //http://localhost:8080/api/admin/user/{id}
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userDao.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    //http://localhost:8080/api/admin/users/{id}
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id) {
        Optional<User> userOpt = userDao.findById(id);
        if (userOpt.isPresent()) {
            userDao.deleteUser(id);
            return ResponseEntity.ok("User with ID " + id + " deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

  //http://localhost:8080/api/admin/users/{id}
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable Long id, @RequestBody User updatedData) {
        Optional<User> userOpt = userDao.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setName(updatedData.getName());
            user.setEmail(updatedData.getEmail());
            user.setMobile(updatedData.getMobile());
            user.setRole(updatedData.getRole());
            user.setGender(updatedData.getGender());
            user.setDob(updatedData.getDob());
            user.setAddress(updatedData.getAddress());

            if (updatedData.getPassword() != null && !updatedData.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(updatedData.getPassword()));
            }

            return ResponseEntity.ok(userDao.saveUser(user));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
  //http://localhost:8080/api/admin/users/{id}/disable
    @PutMapping("/users/{id}/disable")
    public ResponseEntity<?> disableUser(@PathVariable Long id) {
        Optional<User> userOpt = userDao.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setDisabled(true);
            userDao.saveUser(user);
            return ResponseEntity.ok("User disabled successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    

    //http://localhost:8080/api/admin/drugs/{id}
    @DeleteMapping("/drugs/{id}")
    public ResponseEntity<?> deleteDrugById(@PathVariable Long id) {
        Optional<Drug> drugOpt = drugDao.getDrugById(id);
        if (drugOpt.isPresent()) {
            drugDao.deleteDrug(id);
            return ResponseEntity.ok("Drug with ID " + id + " deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


 @PutMapping("/profile")
    public ResponseEntity<User> updateAdminProfile(@RequestBody User updatedData) {
        // Get the email from localStorage (frontend sends it in request body or Authorization token)
        String email = updatedData.getEmail();
        
        Optional<User> userOpt = userDao.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setName(updatedData.getName());
            user.setMobile(updatedData.getMobile());
            user.setGender(updatedData.getGender());
            user.setDob(updatedData.getDob());
            user.setAddress(updatedData.getAddress());

            return ResponseEntity.ok(userDao.saveUser(user));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}