import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologistNewComponent } from './dermatologist-new.component';

describe('DermatologistNewComponent', () => {
  let component: DermatologistNewComponent;
  let fixture: ComponentFixture<DermatologistNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DermatologistNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
