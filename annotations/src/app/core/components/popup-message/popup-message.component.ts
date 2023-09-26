import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupMessageService } from '../../services/popup-message.service';

@Component({
  selector: 'app-popup-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.scss'],
})
export class PopupMessageComponent {
  constructor(private popupMessageService: PopupMessageService) {}
}
