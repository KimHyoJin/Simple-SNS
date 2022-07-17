package com.fast.campus.simplesns.service;

import com.fast.campus.simplesns.exception.ErrorCode;
import com.fast.campus.simplesns.exception.SimpleSnsApplicationException;
import com.fast.campus.simplesns.model.Post;
import com.fast.campus.simplesns.model.entity.PostEntity;
import com.fast.campus.simplesns.model.entity.UserEntity;
import com.fast.campus.simplesns.repository.PostEntityRepository;
import com.fast.campus.simplesns.repository.UserEntityRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class PostService {

    private final UserEntityRepository userEntityRepository;
    private final PostEntityRepository postEntityRepository;

    @Transactional
    public void create(String userName, String title, String body) {
        UserEntity userEntity = userEntityRepository.findByUserName(userName)
                .orElseThrow(() -> new SimpleSnsApplicationException(ErrorCode.USER_NOT_FOUND, String.format("userName is %s", userName)));
        PostEntity postEntity = PostEntity.of(title, body, userEntity);
        postEntityRepository.save(postEntity);
    }

    // entity mapping
    public Page<Post> list(Pageable pageable) {
        return postEntityRepository.findAll(pageable).map(Post::fromEntity);
    }

    public Page<Post> my(String userName, Pageable pageable) {
        UserEntity userEntity = userEntityRepository.findByUserName(userName)
                .orElseThrow(() -> new SimpleSnsApplicationException(ErrorCode.USER_NOT_FOUND, String.format("userName is %s", userName)));
        return postEntityRepository.findAllByUser(userEntity, pageable).map(Post::fromEntity);
    }

    @Transactional
    public Post modify(String userName, Integer postId, String title, String body) {
        PostEntity postEntity = postEntityRepository.findById(postId).orElseThrow(() -> new SimpleSnsApplicationException(ErrorCode.POST_NOT_FOUND, String.format("postId is %d", postId)));
        UserEntity userEntity = userEntityRepository.findByUserName(userName)
                .orElseThrow(() -> new SimpleSnsApplicationException(ErrorCode.USER_NOT_FOUND, String.format("userName is %s", userName)));
        if (postEntity.getUser() != userEntity) {
            throw new SimpleSnsApplicationException(ErrorCode.INVALID_PERMISSION, String.format("user %s has no permission with post %d", userName, postId));
        }

        postEntity.setTitle(title);
        postEntity.setBody(body);

        return Post.fromEntity(postEntityRepository.save(postEntity));
    }

    @Transactional
    public void delete(String userName, Integer postId) {
        PostEntity postEntity = postEntityRepository.findById(postId).orElseThrow(() -> new SimpleSnsApplicationException(ErrorCode.POST_NOT_FOUND, String.format("postId is %d", postId)));
        UserEntity userEntity = userEntityRepository.findByUserName(userName)
                .orElseThrow(() -> new SimpleSnsApplicationException(ErrorCode.USER_NOT_FOUND, String.format("userName is %s", userName)));
        if (postEntity.getUser() != userEntity) {
            throw new SimpleSnsApplicationException(ErrorCode.INVALID_PERMISSION, String.format("user %s has no permission with post %d", userName, postId));
        }
        postEntityRepository.delete(postEntity);
    }

}
