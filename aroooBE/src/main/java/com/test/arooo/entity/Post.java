package com.test.arooo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "pid")
    private String pid;

    @Column(name = "title")
    private String title;

    @Column(nullable = false, length = 500)
    private String content;

    private int likes;

}
