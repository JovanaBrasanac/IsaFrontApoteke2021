import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTypesComponent } from './appointment-types.component';

describe('AppointmentTypesComponent', () => {
  let component: AppointmentTypesComponent;
  let fixture: ComponentFixture<AppointmentTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
