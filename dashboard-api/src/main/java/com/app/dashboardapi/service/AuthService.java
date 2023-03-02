package com.app.dashboardapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.app.dashboardapi.auth.JwtTokenUtil;
import com.app.dashboardapi.model.User;
import com.app.dashboardapi.repository.UserRepository;
import com.app.dashboardapi.utils.JwtResponse;
import com.app.dashboardapi.utils.LoginRequest;
import com.app.dashboardapi.utils.SignUpRequest;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenUtil jwtUtils;

    public JwtResponse login(LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtils.generateToken(authentication);
        System.out.println(token);
        String usernameToken = jwtUtils.getUsernameFromToken(token);
        // System.out.println("TESTESTES" + usernameToken);
        JwtResponse jwtToken = new JwtResponse(token, usernameToken, null);
        return jwtToken;
    }

    public ResponseEntity<?> registerUser(SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken!");
        }

        User user = new User(signUpRequest.getUsername(), signUpRequest.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User result = userRepository.save(user);

        return ResponseEntity.ok(result);
    }

    public boolean validateToken(String tokenString) {
        return jwtUtils.validateToken(tokenString);
    }
}