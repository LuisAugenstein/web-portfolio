import { Map, MapMarker, Selectable, Session } from '@dnd-history/shared-interfaces';
import { EntityCollection } from '@ngrx/data';
import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectSession = createEntitySelector<Session>('Session');
export const selectMap = createEntitySelector<Map>('Map');
export const selectMapMarker = createEntitySelector<MapMarker>('MapMarker');

function createEntitySelector<T>(entityName: string) {
  return createSelector(
    (state: AppState) =>
      (state as { [key: string]: any })[`selected${entityName}`],
    (state: AppState) => state.entityCache[entityName],
    (selectedEntity: Selectable, entities?: EntityCollection<T>) => {
      return selectedEntity?.id && entities?.loaded
        ? entities.entities[selectedEntity.id]
        : undefined;
    }
  );
}
