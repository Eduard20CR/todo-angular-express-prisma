import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpFormComponent } from '../../components/sign-up-form/sign-up-form.component';
import { TopBottonMarginComponent } from 'src/app/shared/components/top-botton-margin/top-botton-margin.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, SignUpFormComponent, TopBottonMarginComponent],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {}
