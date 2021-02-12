import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyCreatedAppointmentsComponent } from './already-created-appointments.component';

describe('AlreadyCreatedAppointmentsComponent', () => {
  let component: AlreadyCreatedAppointmentsComponent;
  let fixture: ComponentFixture<AlreadyCreatedAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlreadyCreatedAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyCreatedAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
