package com.app.dashboardapi.controller;

import com.app.dashboardapi.auth.AuthTokenFilter;
import com.app.dashboardapi.auth.JwtTokenUtil;
import com.app.dashboardapi.service.CustomUserDetailsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

import static com.app.dashboardapi.utils.apiUrl.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(USER_BASE)
public class UserController {

    @Autowired
    CustomUserDetailsService userDetailsService;

    @Autowired
    AuthTokenFilter authTokenFilter;

    @Autowired
    private JwtTokenUtil jwtUtils;
    
    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin Board.";
    }

    @GetMapping("/info/{username}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getUserFromUsername(@PathVariable String username, HttpServletRequest request) {

        String token = authTokenFilter.parseJwt(request);
        String tokenUsername = jwtUtils.getUsernameFromToken(token);

        if (Objects.equals(username, tokenUsername)) {
            UserDetails user = userDetailsService.loadUserByUsername(username);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

    }

}
