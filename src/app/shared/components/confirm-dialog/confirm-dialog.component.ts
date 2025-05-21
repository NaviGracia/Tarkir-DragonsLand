import { Component, inject, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  standalone: true,
  imports: [],
})
export class ConfirmDialogComponent {
  title = input.required<string>();
  message = input.required<string>();
  card = input<number>();
  destructive = input<boolean>(false);
  confirmText = input<string>();
  confirm = output<number>();
  cancel = output<void>();
}
