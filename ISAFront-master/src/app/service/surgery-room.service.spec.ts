import { TestBed } from '@angular/core/testing';

import { SurgeryRoomService } from './surgery-room.service';

describe('SurgeryRoomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurgeryRoomService = TestBed.get(SurgeryRoomService);
    expect(service).toBeTruthy();
  });
});
