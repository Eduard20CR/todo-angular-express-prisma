import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/shared/components/container/container.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsHelpersService } from 'src/app/core/services/forms-helpers.service';
import { UserSignInDTO } from '../../models/login.models';
import { SignInService } from '../../services/sign-in.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[app-sign-in-form]',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ReactiveFormsModule, MatProgressSpinnerModule, RouterLink],
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnDestroy {
  apiErrors$ = this.signInService.apiErrors$;
  loading$ = this.signInService.loading$;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private signInService: SignInService, public fh: FormsHelpersService) {}

  ngOnDestroy(): void {
    this.signInService.resetSubjects();
  }

  submit() {
    if (this.form.invalid) return this.form.markAllAsTouched();
    const value: UserSignInDTO = {
      ...(this.form.value as UserSignInDTO),
    };
    this.signInService.signIn(value);
  }
}
