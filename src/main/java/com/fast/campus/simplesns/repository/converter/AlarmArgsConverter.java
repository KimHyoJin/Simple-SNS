package com.fast.campus.simplesns.repository.converter;

import com.fast.campus.simplesns.model.AlarmArgs;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.AttributeConverter;

public class AlarmArgsConverter implements AttributeConverter<AlarmArgs, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(AlarmArgs information) {
        try {
            return objectMapper.writeValueAsString(information);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public AlarmArgs convertToEntityAttribute(String jsonString) {
        try {
            return objectMapper.readValue(jsonString, AlarmArgs.class);
        } catch (Exception e) {
            return null;
        }
    }
}

