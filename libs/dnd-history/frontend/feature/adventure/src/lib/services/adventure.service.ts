import { HttpClient } from '@angular/common/http';
import { Adventure, AdventureDTO } from '@dnd-history/shared-interfaces';
import { Observable } from 'rxjs';
import { environment, SessionService } from '@dnd-history/frontend-services';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdventureService {
  constructor(
    private readonly http: HttpClient,
    private readonly sessionService: SessionService
  ) {}

  readAdventures(): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(
      `${environment.backendUrl}/session/${
        this.sessionService.getCurrentSession().id
      }/adventure`
    );
  }

  createAdventure(adventureDTO: AdventureDTO): Observable<Adventure> {
    return this.http.post(
      `${environment.backendUrl}/session/${
        this.sessionService.getCurrentSession().id
      }/adventure`,
      adventureDTO
    ) as Observable<Adventure>;
  }

  updateAdventure(updatedAdventure: Adventure) {
    console.log(updatedAdventure);
    return this.http.put(
      `${environment.backendUrl}/adventure/${updatedAdventure.id}`,
      {
        title: updatedAdventure.title,
        content: updatedAdventure.content,
      }
    );
  }
}
