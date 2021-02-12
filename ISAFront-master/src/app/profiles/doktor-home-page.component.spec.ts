import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorHomePageComponent } from './doktor-home-page.component';

describe('DoktorHomePageComponent', () => {
  let component: DoktorHomePageComponent;
  let fixture: ComponentFixture<DoktorHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoktorHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoktorHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
