package com.test.arooo.service;

import com.test.arooo.dto.PostDTO;
import com.test.arooo.entity.Post;
import com.test.arooo.repo.PostRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<PostDTO> list() {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(post -> modelMapper.map(post, PostDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public PostDTO getPost(String id) {
        Optional<Post> post = postRepository.findById(id);
        Post result = post.orElseThrow(() -> new RuntimeException("Post not found"));
        return modelMapper.map(result, PostDTO.class);
    }

    @Override
    public PostDTO likeAdd(String id) {
        Optional<Post> postOptional = postRepository.findById(id);
        Post post = postOptional.orElseThrow(() -> new RuntimeException("Post not found"));
        post.setLikes(post.getLikes() + 1);
        postRepository.save(post);
        return modelMapper.map(post, PostDTO.class);
    }

    @Override
    public void deletePost(String id) {
        postRepository.deleteById(id);
    }
}