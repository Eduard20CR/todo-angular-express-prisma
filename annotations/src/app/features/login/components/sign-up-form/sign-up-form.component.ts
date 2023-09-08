import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/shared/components/container/container.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { confirmPasswordValidator } from '../../utils/confirmed-password.validator';

@Component({
  selector: '[app-sign-up-form]',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ReactiveFormsModule],
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
  fb = inject(FormBuilder);
  loginService = inject(LoginService);

  form = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
      Validators: [confirmPasswordValidator()],
    }
  );

  submit() {
    if (this.form.valid) {
      console.log(this.form.valid);

      this.loginService.signUp(this.form.value);
    }
  }
}
