import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/shared/components/container/container.component';

@Component({
  selector: '[app-home-animation]',
  standalone: true,
  imports: [CommonModule, ContainerComponent],
  templateUrl: './home-animation.component.html',
  styleUrls: ['./home-animation.component.scss'],
})
export class HomeAnimationComponent {}
