import { TestBed } from '@angular/core/testing';
import { PhamacyService } from '../service/pharmacy.service';

describe('ClinicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhamacyService = TestBed.get(PhamacyService);
    expect(service).toBeTruthy();
  });
});