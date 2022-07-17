package com.fast.campus.simplesns.exception;

import com.fast.campus.simplesns.controller.response.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static com.fast.campus.simplesns.exception.ErrorCode.DATABASE_ERROR;

@RestControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(SimpleSnsApplicationException.class)
    public ResponseEntity<?> errorHandler(SimpleSnsApplicationException e) {
        return ResponseEntity.status(e.getErrorCode().getStatus())
                .body(Response.error(e.getErrorCode().name(), e.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> databaseErrorHandler(IllegalArgumentException e) {
        return ResponseEntity.status(DATABASE_ERROR.getStatus())
                .body(Response.error(DATABASE_ERROR.name(), String.format("%s. %s", DATABASE_ERROR.getMessage() + e.getMessage())));
    }
}

