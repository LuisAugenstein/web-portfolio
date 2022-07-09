import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MapPreferencesService {
  showMapMarkers$ = new BehaviorSubject(true);
}
