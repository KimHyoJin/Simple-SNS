package com.fast.campus.simplesns.controller.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Response<T> {
    private String resultCode;
    private String resultMessage;
    private T result;

    public static <T> Response<T> success(T result) {
        return new Response<T>("SUCCESS", null, result);
    }

    public static Response<Void> error(String resultCode, String resultMessage) {
        return new Response<Void>(resultCode, resultMessage, null);
    }

    public String toStream() {
        return "{" +
                "\"resultCode\":" + "\"" + resultCode + "\"," +
                "\"resultMessage\":" + "\"" + resultMessage + "\"," +
                "\"result\":" + "\"" + result + "\"," +
                "}";
    }
}
