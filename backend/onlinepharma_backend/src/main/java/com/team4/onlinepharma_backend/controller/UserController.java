package com.team4.onlinepharma_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team4.onlinepharma_backend.dao.UserDao;
import com.team4.onlinepharma_backend.model.User;

import org.springframework.web.bind.annotation.RequestMethod;


@CrossOrigin(origins = "*",methods = {RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE})
@RestController
@RequestMapping("/api")
//http://localhost:8080/api

public class UserController {
	
	 @Autowired
	    private UserDao userDao;

	    @PostMapping("/admin/user")
	    public User createUser(@RequestBody User user) {
	        return userDao.save(user);
	    }
	    

	    @GetMapping("/admin/users")
	    public List<User> getAllUsers() {
	        return userDao.findAll();
	    }

	    @GetMapping("/admin/user/{id}")
	    public ResponseEntity<User> getUser(@PathVariable Long id) {
	        return userDao.findById(id)
	                .map(ResponseEntity::ok)
	                .orElse(ResponseEntity.notFound().build());
	    }
	
	

}
