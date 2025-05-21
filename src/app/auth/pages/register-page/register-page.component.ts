import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { FormUtils } from '@utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  router = inject(Router);
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  formUtils = FormUtils;

  formSubmitted = signal<boolean>(false);
  hasError = signal<boolean>(false);

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4), ]],
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', Validators.required],
  },{
    validators: [FormUtils.isFieldOneEqualFieldTwo('password', 'password2')],
  });

  onSubmit(): void{
    this.registerForm.markAllAsTouched()
    if(this.registerForm.invalid) return;
    this.formSubmitted.set(true);

    this.authService.register(this.registerForm.controls['username'].value?.toString() || '', this.registerForm.controls['email'].value?.toString() || '', this.registerForm.controls['password'].value?.toString() || '')
      .then((response) => {
        this.router.navigateByUrl('');
      });
  }
}
