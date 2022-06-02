import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerCheckboxComponent } from './layer-checkbox.component';

describe('LayerCheckboxComponent', () => {
  let component: LayerCheckboxComponent;
  let fixture: ComponentFixture<LayerCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayerCheckboxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
