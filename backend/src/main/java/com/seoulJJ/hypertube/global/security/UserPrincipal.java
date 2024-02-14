package com.seoulJJ.hypertube.global.security;

import java.util.Collection;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.seoulJJ.hypertube.domain.user.User;
import com.seoulJJ.hypertube.domain.user.type.RoleType;

public class UserPrincipal implements UserDetails {

    private final Long id;
	private final Collection<? extends GrantedAuthority> authorities;
	private Map<String, Object> attributes;
    private String email;
	private String password;

    public UserPrincipal(Long userId, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = userId;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserPrincipal create(User user) {
		List<GrantedAuthority> authorities = new ArrayList<>();
		if (user.getRoleType().getKey().equals("ROLE_USER")) {
			authorities.add(new SimpleGrantedAuthority(RoleType.USER.getKey()));
		} else if (user.getRoleType().getKey().equals("ROLE_ADMIN")) {
			authorities.add(new SimpleGrantedAuthority(RoleType.USER.getKey()));
			authorities.add(new SimpleGrantedAuthority(RoleType.ADMIN.getKey()));
		}
		return new UserPrincipal(user.getId(), user.getEmail(), user.getPassword(), authorities);
	}

    public Long getId() {
        return id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
