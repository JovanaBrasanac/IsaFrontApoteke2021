import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHolidayViewComponent } from './request-holiday-view.component';

describe('RequestHolidayViewComponent', () => {
  let component: RequestHolidayViewComponent;
  let fixture: ComponentFixture<RequestHolidayViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestHolidayViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestHolidayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
