import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { TopBottonMarginComponent } from 'src/app/shared/components/top-botton-margin/top-botton-margin.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TopBottonMarginComponent],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {}
