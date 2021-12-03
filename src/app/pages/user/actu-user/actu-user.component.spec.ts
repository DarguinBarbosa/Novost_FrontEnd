import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuUserComponent } from './actu-user.component';

describe('ActuUserComponent', () => {
  let component: ActuUserComponent;
  let fixture: ComponentFixture<ActuUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActuUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActuUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
