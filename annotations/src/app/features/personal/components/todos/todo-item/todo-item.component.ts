import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../../models/todo.model';
import { TrashIconComponent } from 'src/app/shared/components/icons/trash-icon/trash-icon.component';
import { PlusIconComponent } from 'src/app/shared/components/icons/plus-icon/plus-icon.component';
import { EditIconComponent } from 'src/app/shared/components/icons/edit-icon/edit-icon.component';
import { CheckIconComponent } from 'src/app/shared/components/icons/check-icon/check-icon.component';
import { MenuIconComponent } from 'src/app/shared/components/icons/menu-icon/menu-icon.component';
import { TodosService } from '../../../services/todos.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubmenuComponent } from '../submenu/submenu.component';

@Component({
  selector: '[app-todo-item]',
  standalone: true,
  imports: [CommonModule, TrashIconComponent, PlusIconComponent, EditIconComponent, CheckIconComponent, ReactiveFormsModule, SubmenuComponent],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @ViewChild('subMenuElement', { static: false }) subMenuElement!: ElementRef<HTMLDivElement>;
  @Input() todo!: Todo;
  editMode = false;
  submenuOpen = false;
  form = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  });

  constructor(private todosService: TodosService) {}
  ngOnInit(): void {
    this.form.get('description')?.setValue(this.todo.description);
  }

  toggleCompleted() {
    console.log('asdasd');
    this.todosService.toggleCompleted(this.todo, !this.todo.done);
  }

  deleteTodo() {
    this.todosService.deleteTodo(this.todo);
  }
  submit() {
    const editedTodo: Todo = {
      ...this.todo,
      description: this.form.get('description')?.value as string,
    };
    this.todosService.editTodo(editedTodo);
    this.editMode = false;
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  @HostListener('document:keydown.escape') closeOnEscape() {
    this.submenuOpen = false;
    this.editMode = false;
  }
}
