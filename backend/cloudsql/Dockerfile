FROM gcr.io/cloudsql-docker/gce-proxy:1.33.4-alpine
ENV GOOGLE_APPLICATION_CREDENTIALS="/service_account/key.json"
USER root
RUN apk add --update --no-cache ca-certificates git curl
COPY ./cloudsql /cloudsql
COPY ./service_account /service_account
# COPY ./cloudsql/my.cnf /etc/mysql/my.cnf
CMD /cloud_sql_proxy -dir=/cloudsql -instances=fooder-379012:us-central1:fooder -use_http_health_check
