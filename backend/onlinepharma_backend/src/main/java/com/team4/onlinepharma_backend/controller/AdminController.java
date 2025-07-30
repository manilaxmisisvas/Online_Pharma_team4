package com.team4.onlinepharma_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userDao.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return new ResponseEntity<>(userDao.saveUser(user), HttpStatus.CREATED);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userDao.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

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
                user.setPassword(updatedData.getPassword());
            }
            return ResponseEntity.ok(userDao.saveUser(user));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/drugs")
    public ResponseEntity<List<Drug>> getAllDrugs() {
        List<Drug> drugs = drugDao.getAllDrugs();
        return ResponseEntity.ok(drugs);
    }

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