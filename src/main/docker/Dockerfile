FROM java:8
LABEL maintainer="immoscout24"
MAINTAINER maintainer
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=target/immoscout24-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} immoscout24.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/immoscout24.jar"]
