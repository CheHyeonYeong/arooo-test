package com.test.arooo.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {

    private String pid;

    private String title;

//    @NotEmpty
//    @Size(min = 1, max = 500)
    private String content;

    private int likes;

}
