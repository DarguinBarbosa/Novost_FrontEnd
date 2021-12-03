import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesercionComponent } from './desercion.component';

describe('DesercionComponent', () => {
  let component: DesercionComponent;
  let fixture: ComponentFixture<DesercionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesercionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesercionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
