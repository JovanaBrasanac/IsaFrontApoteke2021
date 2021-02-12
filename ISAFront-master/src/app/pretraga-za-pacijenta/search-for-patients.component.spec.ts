import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForPatientsComponent } from './search-for-patients.component';

describe('SearchForPatientsComponent', () => {
  let component: SearchForPatientsComponent;
  let fixture: ComponentFixture<SearchForPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchForPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchForPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
