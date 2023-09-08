import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInFormComponent } from '../../components/sign-in-form/sign-in-form.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, SignInFormComponent],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {}
