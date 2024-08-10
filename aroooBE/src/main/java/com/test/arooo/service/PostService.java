package com.test.arooo.service;

import com.test.arooo.dto.PostDTO;

import java.util.List;

public interface PostService{

    // 전체 post 보여주기
    List<PostDTO> list();
    PostDTO getPost(String id);
    PostDTO likeAdd(String id);
    void deletePost(String id);


}

