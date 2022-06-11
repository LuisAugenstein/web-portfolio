import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMarkerSidebarComponent } from './map-marker-sidebar.component';

describe('MapMarkerSidebarComponent', () => {
  let component: MapMarkerSidebarComponent;
  let fixture: ComponentFixture<MapMarkerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapMarkerSidebarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMarkerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
