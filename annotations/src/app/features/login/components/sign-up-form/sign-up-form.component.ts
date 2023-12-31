import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/shared/components/container/container.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../utils/confirmed-password.validator';
import { FormsHelpersService } from 'src/app/core/services/forms-helpers.service';
import { UserSignUpDTO } from '../../models/login.models';
import { MAX_PASS_LENGTH, MIN_PASS_LENGTH } from 'src/app/core/constants/auth.constants';
import { emailAlreadyRegisteredValidator } from '../../utils/email-already-created.async-validator';
import { SignUpService } from '../../services/sign-up.service';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: '[app-sign-up-form]',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ReactiveFormsModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnDestroy {
  apiErrors$ = this.signUpService.apiErrors;
  loading$ = this.signUpService.loading;

  form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email], [emailAlreadyRegisteredValidator(this.signUpService)]),
      password: new FormControl('', [Validators.required, Validators.minLength(MIN_PASS_LENGTH), Validators.maxLength(MAX_PASS_LENGTH)]),
      confirmationPassword: new FormControl('', [Validators.required, Validators.minLength(MIN_PASS_LENGTH), Validators.maxLength(MAX_PASS_LENGTH)]),
    },
    [confirmPasswordValidator()]
  );

  constructor(private signUpService: SignUpService, public fh: FormsHelpersService) {}

  ngOnDestroy(): void {
    this.signUpService.resetSubjects();
  }

  submit() {
    if (this.form.invalid) return this.form.markAllAsTouched();
    const value: UserSignUpDTO = {
      email: this.form.get('email')?.value!,
      password: this.form.get('password')?.value!,
      confirmationPassword: this.form.get('confirmationPassword')?.value!,
    };
    this.signUpService.signUp(value);
  }
}
