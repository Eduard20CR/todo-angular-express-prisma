import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[app-top-botton-margin]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-botton-margin.component.html',
  styleUrls: ['./top-botton-margin.component.scss'],
})
export class TopBottonMarginComponent {
  @Input() paddingT: string = '20';
  @Input() paddingB: string = '20';
}
