import { Injectable } from "@angular/core";
import { SelectionService } from "../../private/services/selection/selection.service";

@Injectable({ providedIn: 'root' })
export class SessionSelectionService extends SelectionService {
  protected getCookieKey(): string {
    return 'dnd-history-selectedSession';
  }
}

@Injectable({ providedIn: 'root' })
export class MapSelectionService extends SelectionService {
  protected getCookieKey(): string {
    return 'dnd-history-selectedMap';
  }
}

@Injectable({ providedIn: 'root' })
export class MapMarkerSelectionService extends SelectionService {
  protected getCookieKey(): string {
    return 'dnd-history-selectedMapMarker';
  }
}
