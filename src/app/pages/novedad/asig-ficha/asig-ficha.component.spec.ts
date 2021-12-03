import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsigFichaComponent } from './asig-ficha.component';

describe('AsigFichaComponent', () => {
  let component: AsigFichaComponent;
  let fixture: ComponentFixture<AsigFichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsigFichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsigFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
