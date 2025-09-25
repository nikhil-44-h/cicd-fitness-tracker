# Build Spring Boot JAR
FROM maven:3.9.3-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run the JAR
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY wait-for-it.sh ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh
EXPOSE 8080
ENTRYPOINT ["./wait-for-it.sh", "db:3306", "--timeout=60", "--", "java", "-jar", "app.jar"]

