package com.seoulJJ.hypertube.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDto {

    private String nickname;
 
    private String eMail;

    private String password;

    private String password2;

    private String firstName;

    private String lastName;

    private String imageUrl;

    public String toString() {
        return "CreateUserDto{" +
                "nickname='" + nickname + '\'' +
                ", eMail='" + eMail + '\'' +
                ", password='" + password + '\'' +
                ", password2='" + password2 + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
