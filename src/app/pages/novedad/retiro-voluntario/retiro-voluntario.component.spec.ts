import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiroVoluntarioComponent } from './retiro-voluntario.component';

describe('RetiroVoluntarioComponent', () => {
  let component: RetiroVoluntarioComponent;
  let fixture: ComponentFixture<RetiroVoluntarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetiroVoluntarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetiroVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
