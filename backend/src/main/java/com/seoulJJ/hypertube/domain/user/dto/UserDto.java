package com.seoulJJ.hypertube.domain.user.dto;

import com.seoulJJ.hypertube.domain.user.type.RoleType;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    public String toString() {
        return "UserDto{" +
                "nickname='" + nickname + '\'' +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", roleType=" + roleType +
                '}';
    }
}
