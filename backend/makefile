MYSQL_USER=docker
MYSQL_PASSWORD=password
DB_CONTAINER_NAME=mysql_host
FIREBASE_CONTAINER_NAME=firebase
up:
	docker-compose up
bd:
	docker-compose build
bdsw:
	docker-compose build --progress=plain --no-cache
dp:
	docker-compose up
db:
	docker exec -it $(DB_CONTAINER_NAME) mysql -u $(MYSQL_USER) -p$(MYSQL_PASSWORD)
bs:
	docker exec -it $(DB_CONTAINER_NAME) bash
bsfb:
	docker exec -it $(FIREBASE_CONTAINER_NAME) bash
gogen:
	cd ~/fooder/backend/app && go generate . && go generate ./...
tidy:
	cd ~/fooder/backend/app && go mod tidy
