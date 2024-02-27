package com.seoulJJ.hypertube.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String nickname;
 
    private String email;

    private String firstName;

    private String lastName;

    private String imageUrl;

    public String toString() {
        return "UserDto{" +
                "nickname='" + nickname + '\'' +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
