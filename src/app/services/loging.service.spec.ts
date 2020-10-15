import { TestBed } from '@angular/core/testing';

import { LogingService } from './loging.service';

describe('LoggingService', () => {
  let service: LogingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
