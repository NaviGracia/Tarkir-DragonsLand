import { Component, inject, signal, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { ConfirmDialogComponent } from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@utils/form-utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  imports: [ConfirmDialogComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent implements OnInit{
  authService = inject(AuthService);
  private fb = inject(FormBuilder);

  fu = FormUtils;

  externalProveedor = signal<boolean>(false);
  showDialog = signal(false);

  profileForm: FormGroup = this.fb.group({
    email: ['', [Validators.pattern(FormUtils.emailPattern)]],
    displayName: ['', [Validators.minLength(4)]],
    passwordGroup: this.fb.group({
      currentPassword: ['', [Validators.minLength(6)]],
      newPassword: ['', [Validators.minLength(6)]],
    })
  })

  ngOnInit(){
    const user = this.authService.user();
    if (user?.providerData?.length) {
      this.externalProveedor.set(user.providerData.some(p => p.providerId !== 'password'));
    } else {
      this.externalProveedor.set(false);
    }
  }

  openDialog() {
    this.showDialog.set(true);
  }

  confirmDelete() {
    this.showDialog.set(false);
    console.log('✅ Cuenta eliminada');
    this.authService.deleteCurrentUser();

  }

  cancelDelete() {
    this.showDialog.set(false);
  }

  updateDisplayName() {
    const name = this.profileForm.get('displayName')?.value;
    if (name) {
      this.authService.updateUserDisplayName(name);
    }
  }

  async updatePassword() {
    const passwordGroup = this.profileForm.get('passwordGroup') as FormGroup;
    const currentPassword = passwordGroup.get('currentPassword')?.value;
    const newPassword = passwordGroup.get('newPassword')?.value;

    if (currentPassword && newPassword) {
      try {
        await this.authService.reauthenticate(currentPassword);
        await this.authService.updateCurrentUserPassword(newPassword);
        console.log('Contraseña actualizada');
      } catch (error) {
        console.error('Error al actualizar contraseña:', error);
      }
    } else {
      console.warn('Debes completar ambos campos de contraseña');
    }
  }

  async updateEmail() {
    const newEmail = this.profileForm.get('email')?.value;

    if (newEmail) {
      try {
        await this.authService.updateCurrentUserEmail(newEmail);
        console.log('Email actualizado');
      } catch (error) {
        console.error('Error al actualizar email:', error);
      }
    }
  }

}
