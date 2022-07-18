package com.fast.campus.simplesns.service;

import com.fast.campus.simplesns.exception.ErrorCode;
import com.fast.campus.simplesns.exception.SimpleSnsApplicationException;
import com.fast.campus.simplesns.fixture.TestInfoFixture;
import com.fast.campus.simplesns.fixture.UserEntityFixture;
import com.fast.campus.simplesns.model.User;
import com.fast.campus.simplesns.model.UserRole;
import com.fast.campus.simplesns.model.entity.UserEntity;
import com.fast.campus.simplesns.repository.UserEntityRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    UserService userService;

    @MockBean
    UserEntityRepository userEntityRepository;

    @MockBean
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Test
    void 로그인이_정상동작한다() {
        TestInfoFixture.TestInfo fixture = TestInfoFixture.get();

        when(userEntityRepository.findByUserName(fixture.getUserName())).thenReturn(Optional.empty());

        Assertions.assertDoesNotThrow(() -> userService.login(fixture.getUserName(), fixture.getPassword()));

    }

    @Test
    void 로그인시_유저가_존재하지_않으면_에러를_내뱉는다() {
        TestInfoFixture.TestInfo fixture = TestInfoFixture.get();

        when(userEntityRepository.findByUserName(fixture.getUserName())).thenReturn(Optional.empty());
        SimpleSnsApplicationException exception = Assertions.assertThrows(SimpleSnsApplicationException.class
                , () -> userService.login(fixture.getUserName(), fixture.getPassword()));

        Assertions.assertEquals(ErrorCode.USER_NOT_FOUND, exception.getErrorCode());
    }


    @Test
    void 로그인시_패스워드가_다르면_에러를_내뱉는다() {
        TestInfoFixture.TestInfo fixture = TestInfoFixture.get();

        when(userEntityRepository.findByUserName(fixture.getUserName())).thenReturn(Optional.of(UserEntityFixture.get(fixture.getUserName(), "password1")));
        when(bCryptPasswordEncoder.matches(fixture.getPassword(), "password1")).thenReturn(false);

        SimpleSnsApplicationException exception = Assertions.assertThrows(SimpleSnsApplicationException.class
                , () -> userService.login(fixture.getUserName(), fixture.getPassword()));

        Assertions.assertEquals(ErrorCode.INVALID_PASSWORD, exception.getErrorCode());
    }

    @Test
    void 회원가입이_정상동작한다() {
        TestInfoFixture.TestInfo fixture = TestInfoFixture.get();

        when(userEntityRepository.findByUserName(fixture.getUserName())).thenReturn(Optional.of(UserEntityFixture.get(fixture.getUserName(), fixture.getPassword())));
        when(bCryptPasswordEncoder.encode(fixture.getPassword())).thenReturn("password_encrypt");
        when(userEntityRepository.save(any())).thenReturn(Optional.of(UserEntityFixture.get(fixture.getUserName(), "password_encrypt")));

        Assertions.assertDoesNotThrow(() -> userService.join(fixture.getUserName(), fixture.getPassword()));
    }


    @Test
    void 회원가입시_아이디가_중복되면_다르면_에러를_내뱉는다() {
        TestInfoFixture.TestInfo fixture = TestInfoFixture.get();

        when(userEntityRepository.findByUserName(fixture.getUserName()))
                .thenReturn(Optional.of(UserEntityFixture.get(fixture.getUserName(), fixture.getPassword())));

        SimpleSnsApplicationException exception = Assertions.assertThrows(SimpleSnsApplicationException.class,
                () -> userService.join(fixture.getUserName(), fixture.getPassword()));

        Assertions.assertEquals(ErrorCode.DUPLICATED_USER_NAME, exception.getErrorCode());
    }

}
