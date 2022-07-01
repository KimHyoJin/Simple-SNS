package com.fast.campus.simplesns.service;

import com.fast.campus.simplesns.exception.ErrorCode;
import com.fast.campus.simplesns.exception.SimpleSnsApplicationException;
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
        String userName = "name";
        String password = "password";

        when(userEntityRepository.findByUserName(userName)).thenReturn(Optional.empty());

        Assertions.assertDoesNotThrow(() -> userService.login(userName, password));

    }

    @Test
    void 로그인시_유저가_존재하지_않으면_에러를_내뱉는다() {
        String userName = "name";
        String password = "password";

        when(userEntityRepository.findByUserName(userName)).thenReturn(Optional.empty());


        SimpleSnsApplicationException exception = Assertions.assertThrows(SimpleSnsApplicationException.class
                , () -> userService.login(userName, password));

        Assertions.assertEquals(ErrorCode.USER_NOT_FOUND, exception.getErrorCode());
    }


    @Test
    void 로그인시_패스워드가_다르면_에러를_내뱉는다() {
        String userName = "name";
        String password = "password";
        String wrongPassword = "password1";

        when(userEntityRepository.findByUserName(userName)).thenReturn(Optional.of(UserEntityFixture.get(userName, wrongPassword)));
        when(bCryptPasswordEncoder.matches(password, wrongPassword)).thenReturn(false);

        SimpleSnsApplicationException exception = Assertions.assertThrows(SimpleSnsApplicationException.class
                , () -> userService.login(userName, password));

        Assertions.assertEquals(ErrorCode.INVALID_PASSWORD, exception.getErrorCode());
    }

    @Test
    void 회원가입이_정상동작한다() {
        String userName = "name";
        String password = "password";

        when(userEntityRepository.findByUserName(userName)).thenReturn(Optional.of(UserEntityFixture.get(userName, password)));
        when(bCryptPasswordEncoder.encode(password)).thenReturn("password_encrypt");
        when(userEntityRepository.save(any())).thenReturn(Optional.of(UserEntityFixture.get(userName, "password_encrypt")));

        Assertions.assertDoesNotThrow(() -> userService.join(userName, password));
    }


    @Test
    void 회원가입시_아이디가_중복되면_다르면_에러를_내뱉는다() {
        String userName = "name";
        String password = "password";

        when(userEntityRepository.findByUserName(userName)).thenReturn(Optional.of(UserEntityFixture.get(userName, password)));

        SimpleSnsApplicationException exception = Assertions.assertThrows(SimpleSnsApplicationException.class,
                () -> userService.join(userName, password));

        Assertions.assertEquals(ErrorCode.DUPLICATED_USER_NAME, exception.getErrorCode());
    }

}
