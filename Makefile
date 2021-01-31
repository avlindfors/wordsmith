## React app control ##
install/ui:
	cd wordsmith-ui; npm install;

build/ui:
	cd wordsmith-ui; npm run docker:build;

start/ui:
	cd wordsmith-ui; npm run docker:start;

start/ui/dev:
	cd wordsmith-ui; npm start;

test/ui:
	cd wordsmith-ui; npm run test;

test/e2e:
	cd wordsmith-ui; npm run e2e:docker;

## Spring Boot app control ##
install/server:
	cd wordsmith-server; mvn clean install -DskipTests;

test/server: 
	cd wordsmith-server; mvn test;

build/server:
	cd wordsmith-server; docker build . -t avlindfors/wordsmith-server;

start/server:
	cd wordsmith-server; docker-compose up;

## Requires local mongo instance
start/server/dev:
	cd wordsmith-server; mvn spring-boot:run -Dspring-boot.run.profiles=dev;

## Build the entire system ##
build:
	make build/ui; make build/server;

## Start the entire system ##
start:
	docker-compose up
