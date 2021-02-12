import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpDoctorsAppointmentComponent } from './pop-up-doctors-appointment.component';

describe('PopUpDoctorsAppointmentComponent', () => {
  let component: PopUpDoctorsAppointmentComponent;
  let fixture: ComponentFixture<PopUpDoctorsAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpDoctorsAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpDoctorsAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
