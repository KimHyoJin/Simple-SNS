package com.fast.campus.simplesns.model;

import com.fast.campus.simplesns.model.entity.LikeEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@AllArgsConstructor
public class Like {
    private Integer id;
    private Integer userId;
    private String userName;
    private Integer postId;
    private Timestamp registeredAt;
    private Timestamp updatedAt;
    private Timestamp removedAt;

    public static Like fromEntity(LikeEntity entity) {
        return new Like(
                entity.getId(),
                entity.getUser().getId(),
                entity.getUser().getUserName(),
                entity.getPost().getId(),
                entity.getRegisteredAt(),
                entity.getUpdatedAt(),
                entity.getRemovedAt()
        );
    }
}
