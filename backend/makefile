MYSQL_USER=docker
MYSQL_PASSWORD=password
CONTAINER_NAME=mysql_host
up:
	docker-compose up
bd:
	docker-compose build
bdsw:
	docker-compose build --progress=plain --no-cache
dp:
	docker-compose up
db:
	docker exec -it $(CONTAINER_NAME) mysql -u $(MYSQL_USER) -p$(MYSQL_PASSWORD)
bs:
	docker exec -it $(CONTAINER_NAME) bash
