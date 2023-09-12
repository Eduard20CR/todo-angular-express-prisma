import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalWrapperComponent } from '../../components/personal-wrapper/personal-wrapper.component';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule, PersonalWrapperComponent],
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent {}
