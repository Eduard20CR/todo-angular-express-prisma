import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { Todo } from '../../../models/todo.model';
import { TodosService } from '../../../services/todos.service';

@Component({
  selector: 'app-todo-group',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, CdkDropList, CdkDrag, AddTodoComponent],
  templateUrl: './todo-group.component.html',
  styleUrls: ['./todo-group.component.scss'],
})
export class TodoGroupComponent {
  todos$ = this.todosService.todos$;

  constructor(private todosService: TodosService) {}

  drop(event: CdkDragDrop<string[]>) {
    const newArr = this.todosService.getTodos();
    moveItemInArray(newArr, event.previousIndex, event.currentIndex);
    this.todosService.changeOrder(newArr);
  }
}
