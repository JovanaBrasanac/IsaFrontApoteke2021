import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRequestsListComponent } from './app-requests-list.component';

describe('AppRequestsListComponent', () => {
  let component: AppRequestsListComponent;
  let fixture: ComponentFixture<AppRequestsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRequestsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
