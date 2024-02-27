package com.seoulJJ.hypertube.global.security.info.impl;

import java.util.Map;

import com.seoulJJ.hypertube.domain.user.type.RoleType;
import com.seoulJJ.hypertube.global.security.info.OAuthUserInfo;

public class FacebookOAuthUserInfo extends OAuthUserInfo {

	private String defaultImageUrl = "";

	public FacebookOAuthUserInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getNickname() {
		return attributes.get("name").toString();
	}

	public String getEmail() {
		return attributes.get("email").toString();
	}

	public String getImageUrl() {
        return "";
	}

	@Override
	public RoleType getRoleType() {
		return RoleType.USER;
	}

	@Override
	public Long getProviderId() {
		return Long.valueOf(attributes.get("id").toString());
	}
}