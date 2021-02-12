import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfAppointmentsComponent } from './history-of-appointments.component';

describe('HistoryOfAppointmentsComponent', () => {
  let component: HistoryOfAppointmentsComponent;
  let fixture: ComponentFixture<HistoryOfAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryOfAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOfAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
