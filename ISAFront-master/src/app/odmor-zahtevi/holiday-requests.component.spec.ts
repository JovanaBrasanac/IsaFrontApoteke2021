import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayRequestsComponent } from './holiday-requests.component';

describe('HolidayRequestsComponent', () => {
  let component: HolidayRequestsComponent;
  let fixture: ComponentFixture<HolidayRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
