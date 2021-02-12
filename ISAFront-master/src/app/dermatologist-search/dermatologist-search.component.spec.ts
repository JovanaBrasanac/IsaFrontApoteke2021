import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologistSearchComponent } from './dermatologist-search.component';

describe('DermatologistSearchComponent', () => {
  let component: DermatologistSearchComponent;
  let fixture: ComponentFixture<DermatologistSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DermatologistSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
