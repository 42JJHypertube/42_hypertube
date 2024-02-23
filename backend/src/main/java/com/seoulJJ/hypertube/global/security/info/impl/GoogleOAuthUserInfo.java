package com.seoulJJ.hypertube.global.security.info.impl;

import java.util.Map;

import com.seoulJJ.hypertube.domain.user.type.RoleType;
import com.seoulJJ.hypertube.global.security.info.OAuthUserInfo;

public class GoogleOAuthUserInfo extends OAuthUserInfo {

	private String defaultImageUrl = "";

	public GoogleOAuthUserInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getNickname() {
		return "GOOGLE" + attributes.get("sub").toString();
	}

	@Override
	public String getEmail() {
		if (attributes.get("email") == null) {
			return null;
		}
		return attributes.get("email").toString();
	}

	@Override
	public String getImageUrl() {
		return attributes.get("picture").toString();
	}

	@Override
	public RoleType getRoleType() {
		return RoleType.USER;
	}

	@Override
	public Long getGoogleId() {
		return (Long)attributes.get("sub");
	}
}
