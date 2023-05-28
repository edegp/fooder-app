FROM node:16-slim

ENV GCLOUD_PROJECT="demo-fooder-6493b"

RUN npm add -g firebase-tools@latest
WORKDIR /opt/workspace
COPY ./firebase.json ./
COPY ./firebase.sh ./
RUN  chmod +x ./firebase.sh
ENTRYPOINT ["./firebase.sh"]
