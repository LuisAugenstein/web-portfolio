import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureDialogComponent } from './adventure-dialog.component';

describe('AdventureDialogComponent', () => {
  let component: AdventureDialogComponent;
  let fixture: ComponentFixture<AdventureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventureDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
