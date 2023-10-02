import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupMessage } from 'src/app/core/models/popup-message.mode';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnDestroy {
  @Output() removeMessage = new EventEmitter<number>();
  @Input() delay: number = 1000;
  @Input({ required: true }) message!: PopupMessage;
  timeOut: any;

  ngOnInit(): void {
    this.timeOut = setTimeout(() => {
      this.removeMessage.emit(this.message.id);
    }, this.delay);
  }
  ngOnDestroy(): void {
    clearTimeout(this.timeOut);
  }
}
