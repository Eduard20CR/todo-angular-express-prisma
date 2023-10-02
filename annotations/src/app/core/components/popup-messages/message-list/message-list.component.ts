import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupMessageService } from 'src/app/core/services/popup-message.service';
import { MessageComponent } from '../message/message.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, MessageComponent],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), animate('200ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('200ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class MessageListComponent {
  messages$ = this.popupMessageService.messages$;
  messageDelay = this.popupMessageService.messageDelay;
  constructor(private popupMessageService: PopupMessageService) {}

  removeMessage(index: number) {
    this.popupMessageService.removeMessage(index);
  }
}
