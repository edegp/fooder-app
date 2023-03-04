# Fooder

## 飲食店 recommendation AI

あなたにあったおすすめのお店を AI で瞬時に検索！

## Frontend

node-version 18.9.0
Install package

```shell
cd frontend
yarn install
```

```shell
next dev
```

open http://localhost:3000

### env

+Create Credentials > API KEY

You can create api [here](https://console.cloud.google.com/apis/credentials)

Don't forget Place api [activation](https://console.cloud.google.com/apis/library/places-backend.googleapis.com)

Add these from firebase api config.

You can get
https://console.firebase.google.com/u/1/project/{YOUR_PROJECT_NAME}/overview?hl=ja

If you create application then, open your project setting like a gear button.

ATTENTION!! Don't forget replace {{YOUR_PROJECT_NAME}} part yor project name.

## Backend

### Backend structure

- Go application(graphQL API)
- MySQL (Database)
- Firebase auth (Authorization)

### Initialization

You should change [GCLOUD_PROJECT](https://github.com/edegp/fooder-app/blob/1f8c1aeeca3b0f14a4568e47b983e639f284c027/backend/dockerfile.dev#L5) in dockerfile where at root and ./firebase .

※ **Don't forget to change GCLOUD_PROJECT in ./firebase/dockerfile**

And you have to docker-compose file setting.

```shell
export COMPOSE_FILE=docker-compose.dev.yml
```

### Using firebase Emulator (Optional)

You can start Docker Containers.

If you would like to use firebase emulator.

you need to get application credential

[document](https://firebase.google.com/docs/admin/setup?hl=ja#initialize_the_sdk_in_non-google_environments)

If you use service account or gcloud, Set up json file under [GOOGLE_APPLICATION_CREDENTIALS](https://github.com/edegp/fooder-app/blob/1f8c1aeeca3b0f14a4568e47b983e639f284c027/backend/dockerfile.dev#L5) path (write in dockerfile).

**if you dont use firebase emulator remove [here](https://github.com/edegp/fooder-app/blob/1f8c1aeeca3b0f14a4568e47b983e639f284c027/frontend/src/lib/firebase.ts#L27)**

```diff
 - # if (process.env.NODE_ENV !== 'production') {
 - #  connectAuthEmulator(auth, url)
 - # }
```

If you don't have Docker, [Install Docker Desktop](https://www.docker.com/products/docker-desktop/)

```shell
make db && make up
```

Enjoy your development!
