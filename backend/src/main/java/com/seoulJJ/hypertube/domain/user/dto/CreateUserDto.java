package com.seoulJJ.hypertube.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDto {

    @NotNull(message = "닉네임을 입력해주세요.")
    private String nickname;
 
    @NotNull(message = "이메일을 입력해주세요.")
    @Email(message = "이메일 형식이 아닙니다.")
    private String email;

    @NotNull(message = "비밀번호를 입력해주세요.")
    private String password;

    @NotNull(message = "비밀번호가 일치하지 않습니다.")
    private String password2;

    @NotNull(message = "이름을 입력해주세요.")
    private String firstName;

    @NotNull(message = "이름을 입력해주세요.")
    private String lastName;

    @NotNull(message = "프로필 이미지를 입력해주세요.")
    private String imageUrl;

    @NotNull(message = "토큰을 입력해주세요.")
    private String token;

    public String toString() {
        return "CreateUserDto{" +
                "nickname='" + nickname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", password2='" + password2 + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
