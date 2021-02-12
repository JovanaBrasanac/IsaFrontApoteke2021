import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSurgeryComponent } from './new-surgery.component';

describe('NewSurgeryComponent', () => {
  let component: NewSurgeryComponent;
  let fixture: ComponentFixture<NewSurgeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSurgeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSurgeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
