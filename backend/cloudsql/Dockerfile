FROM gcr.io/cloudsql-docker/gce-proxy:1.33.4-alpine
USER root
ENV GOOGLE_APPLICATION_CREDENTIALS="/service_account/key.json"
ENV DB_USER=admin
ENV DB_PASS="=75(FG1lzOtMdk_e"
ENV INSTANCE_UNIX_SOCKET=/cloudsql/fooder-379012:us-central1:fooder

RUN apk add --update --no-cache ca-certificates git curl mysql-client
COPY ./cloudsql /cloudsql
COPY ./service_account /service_account
CMD /cloud_sql_proxy -dir=/cloudsql -instances=fooder-379012:us-central1:fooder -use_http_health_check
