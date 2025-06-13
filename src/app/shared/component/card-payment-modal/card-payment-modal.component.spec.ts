import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPaymentModalComponent } from './card-payment-modal.component';

describe('CardPaymentModalComponent', () => {
  let component: CardPaymentModalComponent;
  let fixture: ComponentFixture<CardPaymentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPaymentModalComponent]
    });
    fixture = TestBed.createComponent(CardPaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
