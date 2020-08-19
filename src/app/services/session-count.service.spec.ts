import { TestBed } from '@angular/core/testing';

import { SessionCountService } from './session-count.service';

describe('SessionCountService', () => {
  let service: SessionCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
