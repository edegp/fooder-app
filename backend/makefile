MYSQL_USER=docker
MYSQL_PASSWORD=password
CONTAINER_NAME=mysql_host
up:
	docker-compose up
bd:
	docker-compose build
dp:
	docker-compose up
db:
	docker exec -it $(CONTAINER_NAME) mysql -u $(MYSQL_USER) -p$(MYSQL_PASSWORD)
