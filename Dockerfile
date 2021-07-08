FROM nginx:latest
LABEL maintainer="spyrr"

COPY dist/ /app
COPY conf/default.conf /etc/nginx/conf.d/default.conf