package com.seoulJJ.hypertube.global.security.info.impl;

import java.util.Map;

import com.seoulJJ.hypertube.domain.user.type.RoleType;
import com.seoulJJ.hypertube.global.security.info.OAuthUserInfo;

public class FortyTwoOAuthUserInfo extends OAuthUserInfo {

	private String defaultImageUrl = "";

	public FortyTwoOAuthUserInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getNickname() {
		return attributes.get("login").toString();
	}

	public String getEmail() {
		return attributes.get("email").toString();
	}

	public String getImageUrl() {
		Map<String, Object> image = (Map<String, Object>)attributes.get("image");
		if (image == null) {
			return defaultImageUrl;
		}
		if (image.get("link") == null) {
			return defaultImageUrl;
		}
		return image.get("link").toString();
	}

	@Override
	public RoleType getRoleType() {
		return RoleType.USER;
	}

	@Override
	public Long getGoogleId() {
		return null;
	}
}
