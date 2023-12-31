import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/shared/components/container/container.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ContainerComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {}
