import { ID, Selectable } from '@dnd-history/shared-interfaces';
import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export type LoadAction = ActionCreator<string, () => TypedAction<string>>;
export type LoadedAction<E extends ID> = ActionCreator<
  string,
  (props: { entities: ReadonlyArray<E> }) => {
    entities: ReadonlyArray<E>;
  } & TypedAction<string>
>;
export type AddAction<E extends ID> = ActionCreator<
  string,
  (props: { entity: E }) => {
    entity: E;
  } & TypedAction<string>
>;
export type UpdateAction<E extends ID> = ActionCreator<
  string,
  (props: { entity: E }) => {
    entity: E;
  } & TypedAction<string>
>;
export type RemoveAction = ActionCreator<
  string,
  (props: ID) => ID & TypedAction<string>
>;
export type SelectAction = ActionCreator<
  string,
  (props: Selectable) => Selectable & TypedAction<string>
>;

export interface IEntityActions<E extends ID> {
  LOAD?: LoadAction;
  LOADED?: LoadedAction<E>;
  ADD?: AddAction<E>;
  UPDATE?: UpdateAction<E>;
  REMOVE?: RemoveAction;
  SELECT?: SelectAction;
}

export abstract class EntityActions<E extends ID> implements IEntityActions<E> {
  constructor(protected entityName: string) {}

  abstract LOAD?: LoadAction;
  abstract LOADED?: LoadedAction<E>;
  abstract ADD?: AddAction<E>;
  abstract UPDATE?: UpdateAction<E>;
  abstract REMOVE?: RemoveAction;
  abstract SELECT?: SelectAction;

  protected createLoadAction(): LoadAction {
    return createAction(`Load ${this.entityName}s`);
  }

  protected createLoadedAction(): LoadedAction<E> {
    return createAction(
      `Loaded ${this.entityName}s Success`,
      props<{ entities: ReadonlyArray<E> }>()
    );
  }

  protected createAddAction(): AddAction<E> {
    return createAction(`Add ${this.entityName}`, props<{ entity: E }>());
  }

  protected createUpdateAction(): UpdateAction<E> {
    return createAction(`Update ${this.entityName}`, props<{ entity: E }>());
  }
  protected createRemoveAction(): RemoveAction {
    return createAction(`Remove ${this.entityName}`, props<ID>());
  }

  protected createSelectAction(): SelectAction {
    return createAction(`Select ${this.entityName}`, props<Selectable>());
  }
}
