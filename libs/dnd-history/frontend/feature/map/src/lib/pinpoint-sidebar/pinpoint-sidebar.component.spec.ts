import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinpointSidebarComponent } from './pinpoint-sidebar.component';

describe('PinpointSidebarComponent', () => {
  let component: PinpointSidebarComponent;
  let fixture: ComponentFixture<PinpointSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PinpointSidebarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinpointSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
