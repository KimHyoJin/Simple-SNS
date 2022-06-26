package com.fast.campus.simplesns.controller;

import com.fast.campus.simplesns.controller.request.PostWriteRequest;
import com.fast.campus.simplesns.controller.response.Response;
import com.fast.campus.simplesns.controller.response.UserJoinResponse;
import com.fast.campus.simplesns.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/posts")
@AllArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public void create(@RequestBody PostWriteRequest request, Authentication authentication) {
        postService.create(authentication.getName(), request.getTitle(), request.getBody());
    }

}
