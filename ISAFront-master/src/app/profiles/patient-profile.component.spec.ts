import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfleComponent } from './patient-profile.component';

describe('PatientProfleComponent', () => {
  let component: PatientProfleComponent;
  let fixture: ComponentFixture<PatientProfleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientProfleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
