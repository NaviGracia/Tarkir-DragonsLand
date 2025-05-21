import { CommonModule, CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { OrderService } from '@user/services/order.service';
import { ConfirmDialogComponent } from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import { BillingAddressDialogComponent } from "../../components/billing-address-dialog/billing-address-dialog.component";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-billing-page',
  imports: [CurrencyPipe, ConfirmDialogComponent, CommonModule, BillingAddressDialogComponent],
  templateUrl: './billing-page.component.html',
})

export class BillingPageComponent implements AfterViewInit {
  orderService = inject(OrderService);
  authService = inject(AuthService);
  private _snackBar = inject(MatSnackBar);

  defaultCard = signal(1);
  showRemoveDialog = signal(false);
  showChangeDialog = signal(false);
  hideCard1 = signal(false);
  hideCard2 = signal(false);
  cardDialog = signal(0);
  addressDialog = signal(false);
  newCardDialog = signal(false);
  states = signal<string[]>([]);

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

  ngAfterViewInit(){
    this.generateStates();
  }

  openRemoveDialog(card: number) {
    this.cardDialog.set(card);
    this.showRemoveDialog.set(true);
  }

  openAddressDialog() {
    this.addressDialog.set(true);
  }

  openNewCardDialog() {
    this.newCardDialog.set(true);
  }

  openChangeDialog(card: number){
    this.cardDialog.set(card);
    this.showChangeDialog.set(true);
  }

  confirmDelete() {
    if(this.cardDialog() === 1) {
      this.hideCard1.set(true);
      this.defaultCard.set(2);
    } else {
      this.hideCard2.set(true);
      this.defaultCard.set(1);
    }
    this.openSnackBar('Tarjeta Eliminada');
    this.showRemoveDialog.set(false);
  }

  saveAddress(address: any): void {
    this.billingAddress = address;
    this.openSnackBar('Dirección Cambiada');
    this.closeAddressDialog();
  }

  changeDefaultCard() {
    this.defaultCard.set(this.cardDialog());
    this.closeChangeDialog();
    this.openSnackBar('Tarjeta por defecto cambiada');
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

  closeNewCardDialog(){
    this.newCardDialog.set(false);
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

  generateStates() {
    if(this.orderService.orderStorage() != null) {
      for (let index = 0; index < this.orderService.orderStorage()!.length; index++) {
        const num = Math.floor(Math.random() * 3) + 1;
        switch(num) {
          case 1:
            this.states.update((states) => {
              return [...states, 'Paid'];
            });
            break;

          case 2:
            this.states.update((states) => {
              return [...states, 'Processing'];
            });
            break;

          default:
            this.states.update((states) => {
              return [...states, 'Rejected'];
            });
            break;
        }
      }
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom'
    });
  }
}
