package com.team4.onlinepharma_backend.controller;

import com.team4.onlinepharma_backend.dao.UserDao;
import com.team4.onlinepharma_backend.model.User;
import com.team4.onlinepharma_backend.security.JwtUtil;
import javax.naming.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import javax.naming.AuthenticationException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //http://localhost:8080/api/auth/register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            if (user.getRole() == null) user.setRole("USER");
            User savedUser = userDao.saveUser(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
        }
    }
    
  //  http://localhost:8080/api/auth/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) throws AuthenticationException {
        String input = loginRequest.get("emailOrName");
        String password = loginRequest.get("password");

        Authentication auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(input, password)
        );

        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);

        // Use input 
        User user = userDao.findByEmailOrName(input).orElseThrow();

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole());
        response.put("email", user.getEmail());

        return ResponseEntity.ok(response);
    }

}