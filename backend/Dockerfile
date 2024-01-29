FROM openjdk:17-jdk

WORKDIR /app

ARG WAR_FILE=build/libs/hypertube-0.0.1-SNAPSHOT.war

COPY ${WAR_FILE} .

EXPOSE 8080

CMD ["java", "-jar", "hypertube-0.0.1-SNAPSHOT.war"]