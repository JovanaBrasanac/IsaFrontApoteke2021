import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicAdminHomePageComponent } from './clinic-admin-home-page.component';

describe('ClinicAdminHomePageComponent', () => {
  let component: ClinicAdminHomePageComponent;
  let fixture: ComponentFixture<ClinicAdminHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicAdminHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicAdminHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
