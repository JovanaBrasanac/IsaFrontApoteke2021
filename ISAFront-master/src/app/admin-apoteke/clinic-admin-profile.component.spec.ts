import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicAdminProfileComponent } from './clinic-admin-profile.component';

describe('ClinicAdminProfileComponent', () => {
  let component: ClinicAdminProfileComponent;
  let fixture: ComponentFixture<ClinicAdminProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicAdminProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
