import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { OrderService } from '@user/services/order.service';
import { ConfirmDialogComponent } from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import { BillingAddressDialogComponent } from "../../../shared/components/billing-address-dialog/billing-address-dialog.component";
@Component({
  selector: 'app-billing-page',
  imports: [CurrencyPipe, ConfirmDialogComponent, BillingAddressDialogComponent, CommonModule],
  templateUrl: './billing-page.component.html',
})
export class BillingPageComponent {
  orderService = inject(OrderService);
  authService = inject(AuthService);

  defaultCard = signal(1);
  showRemoveDialog = signal(false);
  showChangeDialog = signal(false);
  hideCard1 = signal(false);
  hideCard2 = signal(false);
  cardDialog = signal(0);
  addressDialog = signal(false);

  billingAddress = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: ''
  };

  constructor() {
    this.updateAddressFromCurrentData();
  }

  openRemoveDialog(card: number) {
    this.cardDialog.set(card);
    this.showRemoveDialog.set(true);
  }

  openAddressDialog() {
    this.addressDialog.set(true);
  }

  openChangeDialog(card: number){
    this.cardDialog.set(card);
    this.changeDefaultCard();
    this.showChangeDialog.set(true);
  }

  confirmDelete() {
    if(this.cardDialog() === 1) {
      this.hideCard1.set(true);
    } else {
      this.hideCard2.set(true);
    }
      this.showRemoveDialog.set(false);
  }

  saveAddress(address: any): void {
    this.billingAddress = address;
    this.closeAddressDialog();
  }

  changeDefaultCard() {
    this.defaultCard.set(this.cardDialog());
  }

  cancelDelete() {
    this.showRemoveDialog.set(false);
  }

  closeAddressDialog() {
    this.addressDialog.set(false);
  }

  closeChangeDialog(){
    this.showChangeDialog.set(false);
  }

  updateAddressFromCurrentData() {
    this.billingAddress = {
      name: this.authService.user()?.displayName || '',
      addressLine1: 'Avenida de Baleares 73',
      addressLine2: 'Apt 4B',
      city: 'Valencia',
      country: 'España'
    };
  }

  generateState(): string {
    const num = Math.floor(Math.random() * 3) + 1;
    switch(num) {
      case 1: return 'Paid'

      case 2: return 'Processing'

      default: return 'Rejected'
    }
  }
}
