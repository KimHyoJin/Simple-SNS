package com.fast.campus.simplesns.controller;

import com.fast.campus.simplesns.controller.request.PostModifyRequest;
import com.fast.campus.simplesns.controller.request.PostWriteRequest;
import com.fast.campus.simplesns.controller.response.PostResponse;
import com.fast.campus.simplesns.controller.response.Response;
import com.fast.campus.simplesns.controller.response.UserJoinResponse;
import com.fast.campus.simplesns.model.Post;
import com.fast.campus.simplesns.model.entity.PostEntity;
import com.fast.campus.simplesns.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/posts")
@AllArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public Response<Void> create(@RequestBody PostWriteRequest request, Authentication authentication) {
        postService.create(authentication.getName(), request.getTitle(), request.getBody());
        return Response.success();
    }

    @GetMapping
    public Response<Page<PostResponse>> list(Pageable pageable, Authentication authentication) {
        return Response.success(postService.list(pageable).map(PostResponse::fromPost));
    }

    @GetMapping("/my")
    public Response<Page<PostResponse>> myPosts(Pageable pageable, Authentication authentication) {
        return Response.success(postService.my(authentication.getName(), pageable).map(PostResponse::fromPost));
    }

    @PutMapping("/{postId}")
    public Response<PostResponse> modify(@PathVariable Integer postId, @RequestBody PostModifyRequest request, Authentication authentication) {
        return Response.success(
                PostResponse.fromPost(
                        postService.modify(authentication.getName(), postId, request.getTitle(), request.getBody())));
    }

    @DeleteMapping("/{postId}")
    public Response<Void> delete(@PathVariable Integer postId, Authentication authentication) {
        postService.delete(authentication.getName(), postId);
        return Response.success();
    }
}
