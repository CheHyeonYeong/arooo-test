package com.test.arooo.controller;

import com.test.arooo.dto.PostDTO;
import com.test.arooo.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/library/content")
public class PostController {
    private final PostService postService;


    @GetMapping("")
    public ResponseEntity<?> list() {
        try {
            List<PostDTO> postDTOS = postService.list();
            return ResponseEntity.ok(postDTOS);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> one(@PathVariable String id) {
        try {
            PostDTO postDTO = postService.getPost(id);
            return ResponseEntity.ok(postDTO);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{id}/like")
    public ResponseEntity<?> like(@PathVariable String id) {
        try {
            PostDTO postDTO = postService.likeAdd(id);
            return ResponseEntity.ok(postDTO);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
