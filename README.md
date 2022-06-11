

# WebPortfolio

Map <--> PinGraph________
            |           |
         MapMarkers   MapMarkerConnections


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
PUT  adventure/:id             (Änderung eines adventures)

GET  session/:id/character
POST session/:id/character
PUT  character/:id

GET  session/:id/map           (returned alle maps der gewählten session)
POST session/:id/map           (erstellt neue map)

GET  map/:id/mapMarker          (returned alle mapMarkers der gewählten map)
POST map/:id/mapMarker          (erstellt neuen mapMarker)
PUT  mapMarker/:id              (Änderung eines mapMarkers)

GET  map/:id/connection        (returned alle connections der gewählten map. client kann connections selbst in layer    
                               sortieren, falls nötig. Connection: | id | sourcePinId | dstPinId | layer |)
POST map/:id/connection        (erstellt neue connection)
PUT  connection/:id            (Änderung einer connection)



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
