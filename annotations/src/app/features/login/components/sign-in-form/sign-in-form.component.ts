import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/shared/components/container/container.component';

@Component({
  selector: '[app-sign-in-form]',
  standalone: true,
  imports: [CommonModule, ContainerComponent],
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent {}
