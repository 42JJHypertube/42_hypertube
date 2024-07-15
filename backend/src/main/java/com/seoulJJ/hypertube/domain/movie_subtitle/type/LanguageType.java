package com.seoulJJ.hypertube.domain.movie_subtitle.type;

import java.util.Locale;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum LanguageType {
    KO("ko"),
    EN("en"),
    FR("fr");

    private final String language;

    @JsonCreator
	public static LanguageType getEnumFromValue(String value) {
		for (LanguageType e : values()) {
			if (e.language.equals(value)) {
				return e;
			} else if (e.language.toLowerCase(Locale.ROOT).equals(value.toLowerCase(Locale.ROOT))) {
				return e;
			}
		}
		return null;
	}
}
