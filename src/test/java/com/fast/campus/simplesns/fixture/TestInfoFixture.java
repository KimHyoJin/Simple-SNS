package com.fast.campus.simplesns.fixture;

import lombok.Data;

public class TestInfoFixture {

    public static TestInfo get() {
        TestInfo info = new TestInfo();
        info.setPostId(1);
        info.setUserId(1);
        info.setUserName("name");
        info.setPassword("password");
        info.setTitle("title");
        info.setBody("body");
        return info;
    }

    @Data
    public static class TestInfo {
        private Integer postId;
        private Integer userId;
        private String userName;
        private String password;
        private String title;
        private String body;
    }
}

