package com.seoulJJ.hypertube.global.security.info;

import java.util.Map;

import com.seoulJJ.hypertube.global.security.info.impl.FortyTwoOAuthUserInfo;
import com.seoulJJ.hypertube.global.security.info.impl.GoogleOAuthUserInfo;

public class OAuthUserInfoFactory {
	public static OAuthUserInfo getOAuth2UserInfo(ProviderType providerType, Map<String, Object> attributes) {
		switch (providerType) {
			case FORTYTWO:
				return new FortyTwoOAuthUserInfo(attributes);
			case GOOGLE:
				return new GoogleOAuthUserInfo(attributes);
			default:
				throw new IllegalArgumentException("Invalid Provider Type.");
		}
	}
}
