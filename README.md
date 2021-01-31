# Wordsmith Inc.

A fullstack web-app built with React & Spring Boot.

> If you want to start the app outside of a docker container you need to have *npm* and *maven* installed as well as a *mongo* database instance. You can use the Spring Boot *application.properties* file to point to your mongo instance of choice.


**Note** All commands are run from the project root unless otherwise specified
## Quick start for development build

### 1. UI
```bash
# in /wordsmith-ui
> npm install
> npm start
```
The development build has hot-reload features and is accessible at *http://localhost:3000* by default.
### 2. Backend
```bash
# in /wordsmith-server
> mvn clean install
> mvn spring-boot:run -Dspring-boot.run.profiles=dev
```
The development build is accessible at *http://localhost:8080* by default and requires a mongo instance to work.
## Quick start for production build
Docker is required to get started with a local production build. The dockerized app has been tested on macOS Catalina and Windows 10.
### 1. Build the UI and server.
With Makefile (builds ui and server docker image)
```bash
> make build
```
With docker
```bash
# in /wordsmith-ui
> docker build . -t avlindfors/wordsmith-ui
# in /wordsmith-server
> docker build . -t avlindfors/wordsmith-server
```
### 2. Start the UI and server.
With Makefile (starts ui and backend docker containers, incl. a mongo instance with mongo-express)
```bash
> make start
```
With docker
```bash
# in /wordsmith-ui
> docker run -p 8000:8000 avlindfors/wordsmith-ui
# in /wordsmith-server
> docker run -p 8080:8080 avlindfors/wordsmith-server
```
## Usage
### 3.1 React UI
Reach the UI at **http://localhost:3000** for the development build or **http://localhost:8000** for the production build.

The backend must be available for the UI to be usable. If you see an error page when the app is opened in a browser this most likely means that 
 1. the backend is not started or
 2. the backend can not connect to the configured mongo instance.
### 3.2 Spring Boot backend
Reach the Spring Boot app at **http://localhost:8080**

**Note** There is no integrated API documentation at this time.

The two available endpoints are:
* *(POST)* /api/v1/reverse 
  * Example body: 
  ```json
  {
    textToReverse: "Reverse me!"
  }
  ```
  * Example response: 
  ```json
  {
    id: "c54f69a5-0bed-412e-a2c3-6db43a18b6e0",
    originalText: "Reverse me!",
    reversedText: "esreveR em!",
    createdTs: "2021-01-28T21:20:07.373Z"
  }  
  ```
* *(GET)* /api/v1/reversals 
  * Example response: 
  ```json
  {
    recentReversals: [{
      id: "c54f69a5-0bed-412e-a2c3-6db43a18b6e0",
      originalText: "Reverse me!",
      reversedText: "esreveR em!",
      createdTs: "2021-01-28T21:20:07.373Z"
    }] 
  }
  ```
### 3.3 Mongo admin interface (mongo-express)
Reach the Mongo admin interface at **http://localhost:8081**

The dockerized Mongo instance does not reset between restarts. Use the admin interface to clear the database or delete individual documents.

> **Note** The mongo-express admin ui is only available with the dockerized app.

## Testing
### End-to-end tests
You need to start the UI & backend in order to run the e2e tests found in the UI-module.
To run the e2e tests against the production build:
1. `make start`
2. `make test/e2e`

This will start the Cypress test runner pointing at the dockerized UI. *Keep in mind that the e2e tests will use whichever mongo instance the backend is connected to.*

**Note** Using the script `npm run e2e:dev` you can start the Cypress test runner against a running development build.
   
### React tests
Run the test script in the wordsmith-ui module. For example:
```bash
make test/ui
# or in /wordsmith-ui
npm run test
```
This will start the test watcher. Press **a** to run all tests. This does not require the backend to be running.
### Spring Boot tests
Use maven or run tests from your IDE. For example, using the command line:
```bash
make test/server
# or in /wordsmith-server
mvn test
```
This will run some integration & unit tests using an embedded mongo instance.

## Configuration & Environment variables
It should be relatively straight-forward to deploy this system to a production environment using the dockerized UI & Backend apps.
Most likely the UI & Backend would be deployed separately to encourage a micro-service architecture.
### Configuring the UI
The UI can be configured to point at any arbitrary domain using the environment variables `$REACT_APP_API_HOST` and `$REACT_APP_API_PORT`. 

### Configuring the backend
We can configure the Spring Boot app to point to any mongo instance with the property `spring.data.mongodb.uri`. This means we can use either an instance running on the same machine as the backend app or point to any standalone mongo instance.

If we deploy without using any proxy we can configure the allowed origins, to avoid CORS issues, using the property `wordsmith.cors.allow.origin`.


