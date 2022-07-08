import { Adventure, Map, Session } from '@dnd-history/shared-interfaces';
import { EntityMetadataMap } from '@ngrx/data';
import { Comparer } from '@ngrx/entity';

function sortBy<T extends { [key: string]: any }>(
  key: string
): Comparer<T> {
  return (a: T, b: T) => {
    if(typeof a[key] === 'string'){
      return (a[key] as string).localeCompare(b[key]);
    }
    return (a[key] as number) - (b[key] as number) 
  };
}


const entityMetadata: EntityMetadataMap = {
  Session: {
    sortComparer: sortBy<Session>('name'),
  },
  Adventure: {
    sortComparer: sortBy<Adventure>('createdAt')
  },
  Map: {
    sortComparer: sortBy<Map>('sortIndex')
  }
};

export const entityConfig = {
  entityMetadata,
};
