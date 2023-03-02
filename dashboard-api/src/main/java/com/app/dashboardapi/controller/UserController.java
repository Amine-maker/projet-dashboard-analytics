// package com.app.dashboardapi.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestAttribute;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestHeader;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.ResponseBody;
// import org.springframework.web.bind.annotation.RestController;

// import com.app.dashboardapi.model.User;
// import com.app.dashboardapi.service.AuthService;
// import com.app.dashboardapi.utils.JwtResponse;
// import com.app.dashboardapi.utils.LoginRequest;
// import com.app.dashboardapi.utils.SignUpRequest;

// import static com.app.dashboardapi.utils.apiUrl.*;

// @ResponseBody
// @RestController
// @CrossOrigin(origins = "*")
// public class UserController {

//     @Autowired
//     private AuthService authService;

//     @PostMapping(path = SIGNUP_URL)
//     public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
//         return authService.registerUser(signUpRequest);
//     }

//     @PostMapping(path = LOGIN_URL)
//     public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
//         JwtResponse jwt = authService.login(loginRequest);
//         return ResponseEntity.ok(jwt);
//     }

//     @GetMapping(path = VALIDATE_TOKEN_URL)
//     public boolean validateToken(@RequestParam String token) {
//         return authService.validateToken(token);

//         // TODO erreur de taille de clé de verification
//     }
// }
