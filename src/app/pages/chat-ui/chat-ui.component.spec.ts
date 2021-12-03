import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUIComponent } from './chat-ui.component';

describe('ChatUIComponent', () => {
  let component: ChatUIComponent;
  let fixture: ComponentFixture<ChatUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
