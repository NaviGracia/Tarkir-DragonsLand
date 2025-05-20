import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OrderService } from '@user/services/order.service';

@Component({
  selector: 'app-orders-page',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './orders-page.component.html',
})
export class OrdersPageComponent {
  orderService = inject(OrderService);

  generateState(): string {
    const num = Math.floor(Math.random() * 3) + 1;
    console.log(num)
    switch(num) {
      case 1: return 'Delivered'

      case 2: return 'Shipped'

      default: return 'In Process'
    }
  }
}
