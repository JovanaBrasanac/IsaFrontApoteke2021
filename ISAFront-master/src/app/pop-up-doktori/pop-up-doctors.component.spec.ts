import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpDoctorsComponent } from './pop-up-doctors.component';

describe('PopUpDoctorsComponent', () => {
  let component: PopUpDoctorsComponent;
  let fixture: ComponentFixture<PopUpDoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpDoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
