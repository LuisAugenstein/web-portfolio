import {
  Map,
  Selectable,
  Session,
} from '@dnd-history/shared-interfaces';
import { EntityCollection } from '@ngrx/data';
import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectSession = createEntitySelector<Session>('Session');
export const selectMap = createEntitySelector<Map>('Map');
export const selectMapMarker = createSelector(
  (state: AppState) => state.selectedMapMarker,
  selectMap,
  (selectedMapMarker: Selectable, selectedMap?: Map) => {
    if (selectedMapMarker.id === undefined || selectedMap === undefined) {
      return undefined;
    }
    return selectedMap.mapMarkers.find((m) => m.id === selectedMapMarker.id);
  }
);

function createEntitySelector<T>(entityName: string) {
  return createSelector(
    (state: AppState) =>
      (state as { [key: string]: any })[`selected${entityName}`],
    (state: AppState) => state.entityCache[entityName],
    (selectedEntity: Selectable, entities?: EntityCollection<T>) => {
      if (selectedEntity.id === undefined || !entities?.loaded) {
        return undefined;
      }
      return entities.entities[selectedEntity.id];
    }
  );
}
