import { TestBed } from '@angular/core/testing';

import { AppointmentReportService } from './appointment-report.service';

describe('AppointmentReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppointmentReportService = TestBed.get(AppointmentReportService);
    expect(service).toBeTruthy();
  });
});
