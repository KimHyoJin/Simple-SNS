package com.fast.campus.simplesns.exception;

import com.fast.campus.simplesns.controller.response.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(SimpleSnsApplicationException.class)
    public ResponseEntity<?> errorHandler(SimpleSnsApplicationException e) {
        return ResponseEntity.status(e.getErrorCode().getStatus())
                .body(Response.error(e.getErrorCode().name(), e.getMessage()));
    }
}

