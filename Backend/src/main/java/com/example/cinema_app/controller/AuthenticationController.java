package com.example.cinema_app.controller;

import com.example.cinema_app.modal.AuthenticationResponse;
import com.example.cinema_app.modal.LoginRequest;
import com.example.cinema_app.modal.User;
import com.example.cinema_app.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authService;

    public AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register (
            @RequestBody User request
            ){
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping ("/login")
    public ResponseEntity<AuthenticationResponse>login(
            @RequestBody LoginRequest request
    ){
        return ResponseEntity.ok(authService.authenticate(request));
    }
}
