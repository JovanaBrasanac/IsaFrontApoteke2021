import { TestBed } from '@angular/core/testing';

import { SurgeryServiceService } from './surgery-service.service';

describe('SurgeryServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurgeryServiceService = TestBed.get(SurgeryServiceService);
    expect(service).toBeTruthy();
  });
});
