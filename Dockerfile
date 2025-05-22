FROM gcr.io/google-appengine/openjdk:8

# Set locale to UTF-8
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

#Download the latest version of Metabase
ADD http://downloads.metabase.com/v0.54.9/metabase.jar ./metabase.jar
