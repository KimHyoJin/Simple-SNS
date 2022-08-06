package com.fast.campus.simplesns.controller;


import com.fast.campus.simplesns.controller.request.UserJoinRequest;
import com.fast.campus.simplesns.controller.request.UserLoginRequest;
import com.fast.campus.simplesns.controller.response.*;
import com.fast.campus.simplesns.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/join")
    public Response<UserJoinResponse> join(@RequestBody UserJoinRequest request) {
        return Response.success(UserJoinResponse.fromUser(userService.join(request.getName(), request.getPassword())));
    }

    @PostMapping("/login")
    public Response<UserLoginResponse> login(@RequestBody UserLoginRequest request) {
        String token = userService.login(request.getName(), request.getPassword());
        return Response.success(new UserLoginResponse(token));
    }

    @GetMapping("/me")
    public Response<UserJoinResponse> me(Authentication authentication) {
        return Response.success(UserJoinResponse.fromUser(userService.loadUserByUsername(authentication.getName())));
    }

    @GetMapping("/alarm")
    public Response<Page<AlarmResponse>> alarm(Pageable pageable, Authentication authentication) {
        return Response.success(userService.alarmList(authentication.getName(), pageable).map(AlarmResponse::fromAlarm));
    }

}
