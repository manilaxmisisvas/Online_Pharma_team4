package com.team4.onlinepharma_backend.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.team4.onlinepharma_backend.model.User;
import com.team4.onlinepharma_backend.repo.UserRepository;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String email = null;

        if ("github".equals(registrationId)) {
            // GitHub puts emails in a separate endpoint, but Spring doesn't fetch that by default
            // So email will usually be null here unless user made email public
            email = (String) attributes.get("email");

            if (email == null || email.isBlank()) {
                // Fallback to GitHub login name
                String login = (String) attributes.get("login");
                email = login + "@github.local";
            }
        } else {
            // For Google, email will be present
            email = (String) attributes.get("email");
        }

        Optional<User> userOpt = userRepo.findByEmail(email);


        if (userOpt.isEmpty()) {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(email);
            newUser.setPassword(" ");
            newUser.setRole("USER");
            newUser.setMobile(0L);
            userRepo.save(newUser);
        } else {
        }

        return oAuth2User;
    }

}
