import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOfferComponent } from './purchase-offer.component';

describe('PurchaseOfferComponent', () => {
  let component: PurchaseOfferComponent;
  let fixture: ComponentFixture<PurchaseOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
