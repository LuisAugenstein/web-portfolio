import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState, CharacterService, selectSession } from '@dnd-history/frontend-state';
import { Character, Session } from '@dnd-history/shared-interfaces';
import { Store } from '@ngrx/store';
import { nanoid } from 'nanoid';
import { DialogService } from 'primeng/dynamicdialog';
import { filter, map, Observable, Subscription } from 'rxjs';
import { CharacterDialogComponent } from '../character-dialog/character-dialog.component';

@Component({
  selector: 'dnd-history-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit, OnDestroy {
  characters$ = this.characterService.entities$;
  loaded$ = this.characterService.loaded$;
  private subscription?: Subscription;

  constructor(
    private dialogService: DialogService,
    private characterService: CharacterService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectSession)
      .pipe(filter((selectedSession) => selectedSession !== undefined))
      .subscribe((selectedSession) => {
        this.characterService.clearCache();
        this.characterService.getWithQuery({
          sessionId: (selectedSession as Session).id,
        });
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  filter(event: any, dt: any) {
    dt.filterGlobal(event.target.value, 'contains');
  }

  createCharacterCard(): void {
    this.openCharacterCardDialog({
      id: nanoid(),
      name: '',
      description: '',
      type: '',
    })
      .pipe(map((character: Character) => this.characterService.add(character)))
      .subscribe();
  }

  updateCharacter(character: Character): void {
    this.openCharacterCardDialog(character).subscribe(
      (updatedCharacter: Character) => {
        this.characterService.update(updatedCharacter);
      }
    );
  }

  private openCharacterCardDialog(character: Character): Observable<Character> {
    const reference = this.dialogService.open(CharacterDialogComponent, {
      header: 'Character Details',
      data: character,
    });
    return reference.onClose.pipe(
      filter((character?: Character) => character !== undefined)
    ) as Observable<Character>;
  }
}
