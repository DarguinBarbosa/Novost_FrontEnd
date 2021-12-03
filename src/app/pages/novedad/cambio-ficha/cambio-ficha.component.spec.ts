import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioFichaComponent } from './cambio-ficha.component';

describe('CambioFichaComponent', () => {
  let component: CambioFichaComponent;
  let fixture: ComponentFixture<CambioFichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioFichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
