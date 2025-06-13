import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';

@Component({
  selector: 'app-card-payment-modal',
  templateUrl: './card-payment-modal.component.html',
  styleUrls: ['./card-payment-modal.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CardPaymentModalComponent {
  @ViewChild('cardElement') cardElementRef!: ElementRef;
  @Output() tokenCreated = new EventEmitter<string | null>();

  private stripe!: Stripe;
  card!: StripeCardElement;
  error: string = '';
  loading: boolean = false;

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_YOUR_PUBLIC_KEY'); // Replace this
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardElementRef.nativeElement);
  }

  async submit() {
    this.loading = true;
    const { token, error } = await this.stripe.createToken(this.card);
    this.loading = false;

    if (token) {
      this.tokenCreated.emit(token.id);
    } else {
      this.error = error?.message || 'An error occurred.';
    }
  }

  cancel() {
    this.tokenCreated.emit(null);
  }
}
