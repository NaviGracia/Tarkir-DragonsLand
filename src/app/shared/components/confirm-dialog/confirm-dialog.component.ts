import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  standalone: true,
  imports: [],
})
export class ConfirmDialogComponent {
  @Input() title = '¿Sure?';
  @Input() message = 'This action cannot be undone.';
  @Input() destructive = false;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
