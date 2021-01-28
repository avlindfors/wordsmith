## Commands for building the UI. ##
install/ui:
	cd wordsmith-ui; npm install;

build/ui:
	cd wordsmith-ui; npm run docker:build;

start/ui:
	cd wordsmith-ui; npm run docker:start;

start-dev/ui:
	cd wordsmith-ui; npm start;

## Commands for building the server. ##
install/server:
	cd wordsmith-server; mvn clean install;

build/server:
	cd wordsmith-server; make build;

start/server:
	cd wordsmith-server; make start;

## Build the entire system ##
build:
	make build/ui; make build/server;

## Start the entire system ##
start:
	docker-compose up
