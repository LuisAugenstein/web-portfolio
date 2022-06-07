import { HttpClient } from '@angular/common/http';
import { Adventure, AdventureDTO, Session } from '@dnd-history/shared-interfaces';
import { Observable } from 'rxjs';
import { environment, UserPreferenceService } from '@dnd-history/frontend-services';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdventureService {
  constructor(
    private readonly http: HttpClient,
    private readonly userPreferenceService: UserPreferenceService
  ) {}

  read(): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(
      `${environment.backendUrl}/session/${
        this.userPreferenceService.get<Session>('selectedSession')?.id
      }/adventure`
    );
  }

  create(adventureDTO: AdventureDTO): Observable<Adventure> {
    return this.http.post(
      `${environment.backendUrl}/session/${
        this.userPreferenceService.get<Session>('selectedSession')?.id
      }/adventure`,
      adventureDTO
    ) as Observable<Adventure>;
  }

  update(updatedAdventure: Adventure) {
    return this.http.put(
      `${environment.backendUrl}/adventure/${updatedAdventure.id}`,
      {
        title: updatedAdventure.title,
        content: updatedAdventure.content,
      }
    );
  }
}
