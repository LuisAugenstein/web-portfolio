# dnd-history-map

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test dnd-history-map` to execute the unit tests.

## Features

1. clicking on the map opens a context menu where we can create a new mapMarker

- map Markers all have a click event listener on them. when clicked they become draggable and open
  the map marker sidebar.
- clicking a MapToolButton deactivates the other ones 
- clicking an activated MapToolButton deactivates it again

- activating PlaceMapMarkerButton registers a click event listener on the canvas.
  - on click on the mapMarkerService a new mapMarker is created
  - on deactivation the event listener is removed again



