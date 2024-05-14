# 빌드
FROM gradle:jdk17 AS builder

WORKDIR /app

COPY . .

COPY ./libs/jlibtorrent/lib/x86_64/libjlibtorrent-1.2.19.0.so /lib/libjlibtorrent-1.2.19.0.so

RUN gradle wrapper
RUN ./gradlew build -x test

# 최종 실행
# jlibtorrent 라이브러리가 linux arm64 지원이 안되서 linux amd64사용
# arm 아키텍처 위에서 돌리면 속도가 아주느림, 가급적 amd 아키텍처 위에서 사용 권장
FROM docker.io/library/openjdk@sha256:786fc49d325768140152a6e0f49f1ab392654606289ef1efe8fabe28106cbbf5
# FROM amd64/openjdk:23-ea-17-jdk-bullseye

WORKDIR /app

COPY --from=builder /app/build/libs/hypertube-0.0.1-SNAPSHOT.war .

COPY --from=builder /app/libs/jlibtorrent/lib/x86_64/libjlibtorrent-1.2.19.0.so /lib/libjlibtorrent-1.2.19.0.so

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

EXPOSE 8080

CMD ["java", "-jar", "hypertube-0.0.1-SNAPSHOT.war"]