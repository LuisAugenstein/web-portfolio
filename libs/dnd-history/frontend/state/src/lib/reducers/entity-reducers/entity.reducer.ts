import { ActionCreator, createReducer, on } from '@ngrx/store';

export type AddEntityAction<Entity extends { id: string }> = ActionCreator<
  string,
  (props: { entity: Entity }) => {
    entity: Entity;
  }
>;

export type LoadedEntitiesAction<Entity extends { id: string }> = ActionCreator<
  string,
  (props: { entities: ReadonlyArray<Entity> }) => {
    entities: ReadonlyArray<Entity>;
  }
>;

export type RemoveEntityAction = ActionCreator<
  string,
  (props: { id: string }) => {
    id: string;
  }
>;

/**
 * creates a default reducer to manage a collection of entities.
 * @param addEntity action to add an entity to the collection
 * @param loadedEntities action to retrieve all entities from the collection
 * @param removeEntity action to remove one entity from the collection
 * @returns reducer
 */
export function createDefaultReducer<E extends { id: string }>(
  addEntity: AddEntityAction<E>,
  loadedEntities: LoadedEntitiesAction<E>,
  removeEntity: RemoveEntityAction
) {
  const initialState: ReadonlyArray<E> = [];
  return createReducer(
    initialState,
    on(addEntity, (state, { entity }) => {
      if (state.find(({ id }) => id === entity.id)) {
        return state;
      }
      return [...state, entity];
    }),
    on(loadedEntities, (_state, { entities }) => entities),
    on(removeEntity, (state, { id }) =>
      state.filter((entity) => entity.id !== id)
    )
  );
}
