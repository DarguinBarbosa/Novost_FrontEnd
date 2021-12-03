import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplazamientoComponent } from './aplazamiento.component';

describe('AplazamientoComponent', () => {
  let component: AplazamientoComponent;
  let fixture: ComponentFixture<AplazamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplazamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplazamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
