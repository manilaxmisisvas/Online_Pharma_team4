package com.team4.onlinepharma_backend.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.team4.onlinepharma_backend.model.User;
import com.team4.onlinepharma_backend.repo.UserRepository;
import com.team4.onlinepharma_backend.security.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserRepository repo;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");

        if (email == null || email.isBlank()) {
            String login = oAuth2User.getAttribute("login");
            if (login == null || login.isBlank()) {
                throw new RuntimeException("No email or login found for OAuth2 user.");
            }
            email = login + "@github.local";
            System.out.println(" Email missing, using fallback: " + email);
        }

        Optional<User> user = repo.findByEmail(email);
        if (user.isEmpty()) {
            User newUser = new User();
            newUser.setName(oAuth2User.getAttribute("name") != null ? oAuth2User.getAttribute("name") : email);
            newUser.setEmail(email); 
            newUser.setPassword(" ");
            newUser.setRole("USER");
            newUser.setMobile(0L);
            repo.save(newUser);       
        }

        String token = jwtUtil.generateTokenFromEmail(email);

        response.sendRedirect("http://localhost:5173/oauth-success?token=" + token);
    }

}