include .env
include .env.remote

up:
	docker-compose up
bd:
	docker-compose build
bdsw:
	docker-compose build --progress=plain --no-cache
dp:
	docker-compose up -d
db:
	docker exec -it $(DB_CONTAINER_NAME) mysql -u $(MYSQL_USER) -p$(MYSQL_PASSWORD)
clsql:
	docker exec -it sql_proxy mysql -u $(DB_USER) -p$(DB_PASS) -S $(INSTANCE_UNIX_SOCKET)
bs:
	docker exec -it $(DB_CONTAINER_NAME) bash
bsfb:
	docker exec -it $(FIREBASE_CONTAINER_NAME) bash
gogen:
	cd ~/fooder/backend/app && go generate ./... && go generate ./...
tidy:
	cd ~/fooder/backend/app && go mod tidy
