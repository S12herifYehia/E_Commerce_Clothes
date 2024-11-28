import { TestBed } from '@angular/core/testing';

import { ErrorHandleServicesService } from './error-handle-services.service';

describe('ErrorHandleServicesService', () => {
  let service: ErrorHandleServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandleServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
