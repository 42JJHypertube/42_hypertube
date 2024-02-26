package com.seoulJJ.hypertube.global.security.info;

import java.util.Map;

import com.seoulJJ.hypertube.domain.user.type.RoleType;

public abstract class OAuthUserInfo {
	protected Map<String, Object> attributes;

	public OAuthUserInfo(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public abstract String getNickname();

	public abstract String getEmail();

	public abstract String getImageUrl();

	public abstract RoleType getRoleType();

	public abstract Long getProviderId();
}
