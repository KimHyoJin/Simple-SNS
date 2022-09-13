package com.fast.campus.simplesns.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Repository
@RequiredArgsConstructor
public class EmitterRepository {

    private Map<String, SseEmitter> emitterMap = new HashMap<>();

    public SseEmitter save(Integer userId, SseEmitter emitter) {
        final String key = getKey(userId);
        log.info("Set Emitter to Redis {}({})", key, emitter);
        emitterMap.put(key, emitter);
        return emitter;
    }

    public void delete(Integer userId) {
        emitterMap.remove(getKey(userId));
    }

    public Optional<SseEmitter> get(Integer userId) {
        SseEmitter result = emitterMap.get(getKey(userId));
        log.info("Get Emitter from Redis {}", result);
        return Optional.ofNullable(result);
    }

    private String getKey(Integer userId) {
        return "emitter:UID:" + userId;
    }

}

