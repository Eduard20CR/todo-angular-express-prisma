import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[app-container]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  @Input() maxWidth: string = '2xl';
  @Input() paddingX: string = '5';
  @Input() paddingXMobile: string = '5';
  @Input() maxWidthMobile: string = '';
}
