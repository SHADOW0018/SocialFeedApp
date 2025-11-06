package com.example.socialmediaapp.controller;

import com.example.socialmediaapp.model.Post;
import com.example.socialmediaapp.model.User;
import com.example.socialmediaapp.repository.PostRepository;
import com.example.socialmediaapp.repository.UserRepository;
import com.example.socialmediaapp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private PostRepository postRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public List<Post> getAll() {
        return postRepo.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    public Post create(@RequestHeader("Authorization") String auth, @RequestBody Post post) {
        String token = auth.replace("Bearer ", "");
        String username = jwtUtil.extractUsername(token);
        User user = userRepo.findByUsername(username).orElseThrow();
        post.setUser(user);
        return postRepo.save(post);
    }

    @PostMapping("/{id}/like")
    public Post like(@RequestHeader("Authorization") String auth, @PathVariable Long id) {
        String token = auth.replace("Bearer ", "");
        String username = jwtUtil.extractUsername(token);
        userRepo.findByUsername(username).orElseThrow();

        Post p = postRepo.findById(id).orElseThrow();
        p.setLikes(p.getLikes() + 1);
        return postRepo.save(p);
    }
}
