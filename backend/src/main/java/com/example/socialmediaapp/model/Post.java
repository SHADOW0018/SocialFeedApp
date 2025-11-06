package com.example.socialmediaapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000)
    private String content;

    private int likes = 0;

    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    private User user;

    public Post() {}
    public Post(String content) { this.content = content; }
    public Long getId() { return id; }
    public String getContent() { return content; }
    public int getLikes() { return likes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public User getUser() { return user; }
    public void setContent(String content) { this.content = content; }
    public void setLikes(int likes) { this.likes = likes; }
    public void setUser(User user) { this.user = user; }
}
