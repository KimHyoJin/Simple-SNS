package com.fast.campus.simplesns.controller.response;

import com.fast.campus.simplesns.model.Post;
import com.fast.campus.simplesns.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public
class PostResponse {
    private Integer id;
    private String title;
    private String body;
    private UserResponse user;
    private List<CommentResponse> comments;
    private List<LikeResponse> likes;
    private Timestamp registeredAt;
    private Timestamp updatedAt;

    public static PostResponse fromPost(Post post) {
        return new PostResponse(
                post.getId(),
                post.getTitle(),
                post.getBody(),
                UserResponse.fromUser(post.getUser()),
                post.getComments().stream().map(CommentResponse::fromComment).collect(Collectors.toList()),
                post.getLikes().stream().map(LikeResponse::fromLike).collect(Collectors.toList()),
                post.getRegisteredAt(),
                post.getUpdatedAt()
        );
    }

}
