import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, output, Output, input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-billing-address-dialog',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './billing-address-dialog.component.html',
})
export class BillingAddressDialogComponent {
  isOpen = input.required();
  currentAddress = input.required<any>();
  close = output<void>();
  save = output<any>();

  addressForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.resetForm();
  }

  ngOnChanges(): void {
    if (this.isOpen()) {
      this.resetForm();
    }
  }

  resetForm(): void {
    if (this.currentAddress) {
      this.addressForm.setValue({
        name: this.currentAddress().name || '',
        addressLine1: this.currentAddress().addressLine1 || '',
        addressLine2: this.currentAddress().addressLine2 || '',
        city: this.currentAddress().city || '',
        country: this.currentAddress().country || ''
      });
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.save.emit(this.addressForm.value);
      this.onClose();
    }
  }
}
