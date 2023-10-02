import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PopupMessage } from '../models/popup-message.mode';

@Injectable({
  providedIn: 'root',
})
export class PopupMessageService {
  private messages = new BehaviorSubject<PopupMessage[]>([]);
  messages$ = this.messages.asObservable();
  messageDelay = 3000;

  constructor() {}

  addMessage(message: string) {
    const messages = this.messages.getValue();
    const newMessage: PopupMessage = {
      id: messages.length,
      message,
    };
    this.messages.next([...messages, newMessage]);
  }

  removeMessage(id: number) {
    const messages = this.messages.getValue();
    this.messages.next([...messages.filter((mes) => mes.id !== id)]);
  }
}
