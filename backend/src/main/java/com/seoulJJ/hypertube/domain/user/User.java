package com.seoulJJ.hypertube.domain.user;

import com.seoulJJ.hypertube.domain.user.type.RoleType;
import com.seoulJJ.hypertube.domain.user.userMovie.UserMovie;
import com.seoulJJ.hypertube.global.utils.BaseTimeEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nickname", length = 30)
    private String nickname;

    @Column(name = "e_mail", length = 60, unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "role_type")
    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserMovie> userMovies;

    public User(String nickname, String email, String password, String firstName, String lastName, String imageUrl,
            RoleType roleType) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.imageUrl = imageUrl;
        this.roleType = roleType;
    }

    public void updatePassword(String encryptedPassword) {
        this.password = encryptedPassword;
    }

    public void updateImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void updateNickname(String updateNickname) {
        this.nickname = updateNickname;
    }

    public void addUserMovie(UserMovie userMovie) {
        userMovies.add(userMovie);
    }

    public String toString() {
        return "User{" +
                "id=" + id +
                ", nickname='" + nickname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", roleType=" + roleType +
                '}';
    }
}
