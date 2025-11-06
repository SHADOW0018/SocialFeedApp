package com.example.socialmediaapp.controller;

import com.example.socialmediaapp.model.User;
import com.example.socialmediaapp.repository.UserRepository;
import com.example.socialmediaapp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {
        if (userRepo.findByUsername(user.getUsername()).isPresent()) {
            return Map.of("error", "username_taken");
        }
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(409).body(Map.of("error", "Email already registered")).getBody();
        }
        user.setPassword(encoder.encode(user.getPassword()));
        userRepo.save(user);
        return Map.of("message", "registered");
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {
        User db = userRepo.findByUsername(user.getUsername()).orElseThrow();
        if (encoder.matches(user.getPassword(), db.getPassword())) {
            String token = jwtUtil.generateToken(db.getUsername());
            return Map.of("token", token);
        }
        throw new RuntimeException("Invalid credentials");
    }
}
