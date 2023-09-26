import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../../models/todo.model';

@Component({
  selector: '[app-todo-item]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  host: { class: 'bg-black flex items-center gap-10 py-4 px-10' },
})
export class TodoItemComponent {
  @Input() todo!: Todo;
}
