postgresinit: 
	docker run --name postgres15 -p 5433:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=password -d postgres:15-alpine

postgres: 
	docker exet -it postgres15 psql

createdb: 
	docker exec -it postgres15 createdb --username=root --owner=root go-chat

destroyddb:
	docker exet -it postgres15 dropdb go-chat

.PHONY: postgresinit 
