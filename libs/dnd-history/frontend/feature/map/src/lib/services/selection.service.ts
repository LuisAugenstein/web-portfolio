import { Injectable } from '@angular/core';
import { Map } from '@dnd-history/shared-interfaces';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SelectionService {

  map: ReplaySubject<Map> = new ReplaySubject(1);
  
  setMap(map: Map){
      this.map.next(map);
  }

}
