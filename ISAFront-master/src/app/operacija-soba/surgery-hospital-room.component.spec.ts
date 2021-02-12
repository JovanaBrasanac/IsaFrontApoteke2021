import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryHospitalRoomComponent } from './surgery-hospital-room.component';

describe('SurgeryHospitalRoomComponent', () => {
  let component: SurgeryHospitalRoomComponent;
  let fixture: ComponentFixture<SurgeryHospitalRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryHospitalRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryHospitalRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
