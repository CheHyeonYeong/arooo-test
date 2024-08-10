package com.test.arooo.repository;

import com.test.arooo.entity.Post;
import com.test.arooo.repo.PostRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.stream.IntStream;

@SpringBootTest

public class PostRepositoryTests {
    @Autowired
    private PostRepository postRepository;

    @Test
    public void testInsert() {
        IntStream.rangeClosed(1,20).forEach(i -> {
            Post post = Post.builder()
                    .title("title"+i)
                    .content("content...................."+i)
                    .likes(0)
                    .build();
            Post result = postRepository.save(post);
        });
    }


}
