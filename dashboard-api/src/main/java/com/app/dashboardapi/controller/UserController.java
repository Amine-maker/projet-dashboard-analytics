package com.app.dashboardapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dashboardapi.model.User;
import com.app.dashboardapi.repository.UserRepository;
import com.app.dashboardapi.utils.SignUpRequest;

import static com.app.dashboardapi.utils.apiUrl.*;

@ResponseBody
@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(path = SIGNUP_URL)
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        System.out.println(userRepository.existsByUsername(signUpRequest.getUsername()));
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken!");
        }

        User user = new User(signUpRequest.getUsername(), signUpRequest.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User result = userRepository.save(user);

        return ResponseEntity.ok(result);
    }
}
