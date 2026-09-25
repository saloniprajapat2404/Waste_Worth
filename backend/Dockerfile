FROM maven:3.9.16-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .

RUN mvn -B dependency:go-offline

COPY src ./src

RUN mvn -B clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/waste2worth-backend-1.0.0.jar app.jar

EXPOSE 10000

ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT:-10000} --server.address=0.0.0.0 --spring.datasource.url='jdbc:h2:mem:waste2worth_db;DB_CLOSE_DELAY=-1;MODE=MySQL;NON_KEYWORDS=USER' --spring.datasource.driver-class-name=org.h2.Driver --spring.datasource.username=sa --spring.datasource.password= --spring.jpa.database-platform=org.hibernate.dialect.H2Dialect"]