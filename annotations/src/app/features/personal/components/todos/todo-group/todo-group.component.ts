import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { Todo } from '../../../models/todo.interface';

@Component({
  selector: 'app-todo-group',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, CdkDropList, CdkDrag, AddTodoComponent],
  templateUrl: './todo-group.component.html',
  styleUrls: ['./todo-group.component.scss'],
})
export class TodoGroupComponent {
  todos: Todo[] = [{ completed: false, description: 'Get groceries', id: 1, order: 0 }];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }
}
