# 빌드
FROM gradle:jdk17 AS builder

WORKDIR /app

COPY . .

RUN gradle wrapper
RUN ./gradlew build -x test

# 최종 실행
FROM openjdk:17-jdk

WORKDIR /app

COPY --from=builder /app/build/libs/hypertube-0.0.1-SNAPSHOT.war .

EXPOSE 8080

CMD ["java", "-jar", "hypertube-0.0.1-SNAPSHOT.war"]