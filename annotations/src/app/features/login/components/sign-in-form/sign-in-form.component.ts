import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/shared/components/container/container.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsHelpersService } from 'src/app/core/services/forms-helpers.service';
import { AuthService } from '../../services/auth.service';
import { UserSignInDTO } from '../../models/login.models';

@Component({
  selector: '[app-sign-in-form]',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ReactiveFormsModule],
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent {
  authService = inject(AuthService);
  fh = inject(FormsHelpersService);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  submit() {
    if (this.form.invalid) return this.form.markAllAsTouched();

    const value: UserSignInDTO = {
      ...(this.form.value as UserSignInDTO),
    };

    this.authService.signIn(value);
  }
}
