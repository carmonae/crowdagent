import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingDetailsModalComponent } from './banking-details-modal.component';

describe('BankingDetailsModalComponent', () => {
  let component: BankingDetailsModalComponent;
  let fixture: ComponentFixture<BankingDetailsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankingDetailsModalComponent]
    });
    fixture = TestBed.createComponent(BankingDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
