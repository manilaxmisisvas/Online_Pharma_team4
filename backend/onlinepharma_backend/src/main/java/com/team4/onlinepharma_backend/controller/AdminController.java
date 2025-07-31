package com.team4.onlinepharma_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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

    
   // http://localhost:8080/api/admin/drugs
    @GetMapping("/drugs")
    public ResponseEntity<List<Drug>> getAllDrugs() {
        List<Drug> drugs = drugDao.getAllDrugs();
        return ResponseEntity.ok(drugs);
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

    // http://localhost:8080/api/admin/drugs/{id}
    @PutMapping("/drugs/{id}")
    public ResponseEntity<Drug> updateDrug(@PathVariable Long id, @RequestBody Drug updatedDrug) {
        Drug drug = drugDao.updateDrug(id, updatedDrug);
        if (drug != null) {
            return ResponseEntity.ok(drug);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}