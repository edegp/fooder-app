# step 1: build go app
# 参考 https://qiita.com/sky0621/items/58fa2bcfc0935f6186cb
FROM golang:1.20.1-alpine3.17 as build-step
# for go mod download
RUN apk add --update --no-cache ca-certificates git bash
RUN mkdir /app
WORKDIR /app
COPY app/go.mod app/go.sum ./

RUN go mod download && go mod verify && go mod tidy
COPY app .
RUN cd server && CGO_ENABLED=0 go build -o /go/bin/app

# step 2: exec
FROM scratch
# 証明書
# https://qiita.com/ny7760/items/6f209f61d69e00a82676
COPY --from=build-step /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=build-step /go/bin/app /go/bin/app
EXPOSE 8080
ENTRYPOINT ["/go/bin/app"]
