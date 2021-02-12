import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalRoomSearchComponent } from './hospital-room-search.component';

describe('HospitalRoomSearchComponent', () => {
  let component: HospitalRoomSearchComponent;
  let fixture: ComponentFixture<HospitalRoomSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalRoomSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalRoomSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
