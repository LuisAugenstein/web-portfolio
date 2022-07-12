# Get started
download the repository and run the following two commands in two different terminals to start the application.
```
  nx run dnd-history-backend:serve
  nx run dnd-history: serve
```

# Deployment 
Whenever a commit on the `main` branch is made the backend is automatically deployed to `heroku` and the frontend to `netlify`. 
Heroku uses some environment variables and the `Procfile` to start the dnd-history-backend server.


# Change Database Credentials


# TODO

- rename state services to entity services. does it make sense to let selection services depend on stateservices, so that they can emit the whole entity while only storing the Id in the cookies? On the other hand some services probably only need the id so emitting always the full entity might be overkill.
- backend controller/services find() method. what happens for example when sessionId doesnt exist ?

# general consistency rules

- write 'Id' not 'ID'.

# Backend

## Architecture Decisions:

- own entities module because otherwise we would have circular dependencies.
- in services the "child" adds the parent entity to itself. e.g. set map.session = session in map-entity. not session.maps = maps in session-entity.
  
# Frontend

- selection services only store the id in cookies not the whole entity because when userB deletes the entity, it is still stored in the cookies of userA and could be falsely displayed. 
- entity services also need updatable observables so that entities update on changes, e.g., adding a map marker to a map should trigger the mapService. 

## selection mechanism
selectedSession: loading
selectedSession: {
  id: '123'
}
selectedSession: undefined


1. uninitialized (the cookie wasnt checked yet)
2. value (the cookie was checked successfully and the value could be transfered into the state)
3. not present (the user has no cookie => bring him to login page)


# WebPortfolio
This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

## TODOS
- error handling in backend api controllers and in frontent components
- write unit and end-to-end-tests

# Api Documentation
GET  /session       (returned alle sessions)
POST /session       (erstellung einer session. anfrage enthält keine id. response enthält komplette session mit id)
PUT  /session/:id   (Änderung einer session z.B. Name ändern)

GET  session/:id/adventure     (returned alle adventures der gewählten session)
POST session/:id/adventure     (erstellt neues adventure)
PATCH  adventure/:id             (Änderung eines adventures)

GET  session/:id/character
POST session/:id/character
PATCH  character/:id

GET   session/:id/map             (returned alle maps der gewählten session inclusive mapMarkern und 
                                   mapMarkerConnections)
POST  session/:id/map             (erstellt neue map mit gegebenem src aber leeren mapMarkern, mapMarkerConnections)
PATCH map/:id                     (ändere existierende mapMarker oder mapMarkerConnections)
POST  map/:id/mapMarker           (erstellt neuen mapMarker für gegebene map)
POST  map/:id/mapMarkerConnection 

1. user öffnet map und lädt mit einem http get request alle maps und mit einem weiteren alle mapGraphs
2. cookie speichert nur die id der aktuell gewählten map/session

responsiveness:
header: 80px;
mobile: 370px - 825px;
medium: 825px - 1230px;
desktop: 1230px - open;



🔎 **Smart, Fast and Extensible Build System**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@web-portfolio/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.



## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
