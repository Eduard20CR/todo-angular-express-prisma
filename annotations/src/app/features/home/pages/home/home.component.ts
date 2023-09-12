import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { AboutComponent } from '../../components/about/about.component';
import { HomeAnimationComponent } from '../../components/home-animation/home-animation.component';
import { TopBottonMarginComponent } from 'src/app/shared/components/top-botton-margin/top-botton-margin.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AboutComponent, HomeAnimationComponent, TopBottonMarginComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
