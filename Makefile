## Commands for building the UI. ##
install/ui:
	cd wordsmith-ui; npm install;

build/ui:
	cd wordsmith-ui; npm run docker:build;

start/ui:
	cd wordsmith-ui; npm run docker:start;

start/ui/dev:
	cd wordsmith-ui; npm start;

test/unit:
	cd wordsmith-ui; npm test;

test/e2e/docker:
	cd wordsmith-ui; npm run e2e:docker;

test/e2e/dev:
	cd wordsmith-ui; npm run e2e:dev;

## Commands for building the server. ##
install/server:
	cd wordsmith-server; mvn clean install;

build/server:
	cd wordsmith-server; make build;

start/server:
	cd wordsmith-server; make start;

start/server/dev:
	cd wordsmith-server; make start/dev;

## Build the entire system ##
build:
	make build/ui; make build/server;

## Start the entire system ##
start:
	docker-compose up
