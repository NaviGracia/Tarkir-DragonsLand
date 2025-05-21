import { Component, inject } from '@angular/core';
import { ShoppingCartService } from '@cart/services/shopping-cart.service';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment-page',
  imports: [],
  templateUrl: './payment-page.component.html',
})
export class PaymentPageComponent {
  private cartService = inject(ShoppingCartService);

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: any;

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_TU_CLAVE_PUBLICA');

    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.cardElement = this.elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#374151',
            fontFamily: 'Inter, sans-serif',
            '::placeholder': {
              color: '#9CA3AF',
            },
          },
          invalid: {
            color: '#EF4444',
          },
        },
      });
      this.cardElement.mount('#card-element');
    }
  }

  async pay() {
    if (!this.stripe || !this.cardElement) return;

    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
    });

    if (error) {
      alert(error.message);
    } else {
      console.log('Método de pago:', paymentMethod);
      alert('✅ Pago simulado exitosamente');

      await this.cartService.checkout();
    }
  }

  payWithSavedCard() {
    this.cartService.checkout();
  }
}
