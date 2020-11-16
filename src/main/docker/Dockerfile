FROM java:8
LABEL maintainer="web-crawling"
MAINTAINER maintainer
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=target/demo-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} immoscout24.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/demo-0.0.1-SNAPSHOT.jar.jar"]
