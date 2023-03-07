FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY . /app
COPY pom.xml /app
RUN mvn dependency:go-offline
RUN mvn clean package -DskipTests


FROM openjdk:17
COPY --from=build /app/target/dashboard-api-0.0.1-SNAPSHOT.jar /app.jar
EXPOSE 5000
ENTRYPOINT ["java","-jar","/app.jar"]



