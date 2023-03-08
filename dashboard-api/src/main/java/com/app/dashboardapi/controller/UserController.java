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

        if (authTokenFilter.isAuthUser(username, request)) {
            UserDetails user = userDetailsService.loadUserByUsername(username);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Vous n'êtes pas autorisé à effectuer cette requête");
        }

    }

}
