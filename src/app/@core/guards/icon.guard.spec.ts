import { TestBed } from '@angular/core/testing';

import { IconGuard } from './icon.guard';

describe('IconGuard', () => {
  let guard: IconGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IconGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
