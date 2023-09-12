import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInFormComponent } from '../../components/sign-in-form/sign-in-form.component';
import { TopBottonMarginComponent } from 'src/app/shared/components/top-botton-margin/top-botton-margin.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, SignInFormComponent, TopBottonMarginComponent],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {}
