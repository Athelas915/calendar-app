import { TestBed } from '@angular/core/testing';

import { DayTableService } from './day-table.service';

describe('DayTableService', () => {
  let service: DayTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
