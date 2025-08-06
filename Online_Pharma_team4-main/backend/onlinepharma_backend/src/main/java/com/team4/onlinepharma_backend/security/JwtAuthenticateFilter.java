package com.team4.onlinepharma_backend.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtAuthenticateFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);

        try {
            username = jwtService.extractUsername(jwt);
        } catch (io.jsonwebtoken.MalformedJwtException | io.jsonwebtoken.security.SignatureException e) {
            // Log the error and optionally set response status to 401 Unauthorized
            logger.warn("Invalid JWT token: " + e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return; // Don't continue filter chain
        } catch (Exception e) {
            // Catch any other unexpected exceptions during token parsing
            logger.error("Unexpected error while parsing JWT token", e);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        	UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
                System.out.println("Username from token: " + username);
                System.out.println("Authorities: " + userDetails.getAuthorities());
            }
        }
        


        filterChain.doFilter(request, response);
    }
}