package com.fast.campus.simplesns.model;

import com.fast.campus.simplesns.model.entity.AlarmEntity;
import com.fast.campus.simplesns.model.entity.PostEntity;
import com.fast.campus.simplesns.model.entity.UserEntity;
import com.fast.campus.simplesns.repository.converter.AlarmArgsConverter;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public class Alarm {
    private Integer id = null;

    private User user;

    private AlarmType alarmType;

    private AlarmArgs args;

    private Timestamp registeredAt;

    private Timestamp updatedAt;

    private Timestamp removedAt;

    public String getAlarmText() {
        return alarmType.getAlarmText();
    }

    public static Alarm fromEntity(AlarmEntity entity) {
        return new Alarm(
                entity.getId(),
                User.fromEntity(entity.getUser()),
                entity.getAlarmType(),
                entity.getArgs(),
                entity.getRegisteredAt(),
                entity.getUpdatedAt(),
                entity.getRemovedAt()
        );
    }
}
