package com.seoulJJ.hypertube.global.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seoulJJ.hypertube.domain.user.User;
import com.seoulJJ.hypertube.domain.user.UserRepository;
import com.seoulJJ.hypertube.global.security.UserPrincipal;
import com.seoulJJ.hypertube.global.security.info.OAuthUserInfo;
import com.seoulJJ.hypertube.global.security.info.OAuthUserInfoFactory;
import com.seoulJJ.hypertube.global.security.info.ProviderType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        
        ProviderType providerType = ProviderType.keyOf(userRequest.getClientRegistration().getRegistrationId());
        OAuthUserInfo oAuthUserInfo = OAuthUserInfoFactory.getOAuth2UserInfo(providerType, oAuth2User.getAttributes());

        User savedUser = userRepository.findByEmail(oAuthUserInfo.getEmail()).orElse(null);

        if (savedUser == null) {
            savedUser = new User(oAuthUserInfo.getNickname(), oAuthUserInfo.getEmail(), null, null, null,
                    oAuthUserInfo.getImageUrl(), oAuthUserInfo.getRoleType());
            savedUser = userRepository.save(savedUser);
        }

        return UserPrincipal.create(savedUser, oAuth2User.getAttributes());
    }
}
