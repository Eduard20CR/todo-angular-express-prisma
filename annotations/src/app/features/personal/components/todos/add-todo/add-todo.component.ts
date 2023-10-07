import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusIconComponent } from 'src/app/shared/components/icons/plus-icon/plus-icon.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodosService } from '../../../services/todos.service';
import { Todo, TodoDTO, TodoGroup } from '../../../models/todo.model';
import { Subscription } from 'rxjs';
import { PopupMessageService } from 'src/app/core/services/popup-message.service';

@Component({
  selector: '[app-add-todo]',
  standalone: true,
  imports: [CommonModule, PlusIconComponent, ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  host: { class: '' },
})
export class AddTodoComponent implements OnInit, OnDestroy {
  @ViewChild('inputNewTodo', { static: false }) input!: ElementRef<HTMLInputElement>;
  form = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  });
  addMode = false;
  loading$!: Subscription;
  loading = false;

  constructor(private todosService: TodosService, private popupMessageService: PopupMessageService) {}

  ngOnInit(): void {
    this.loading$ = this.todosService.loading$.subscribe((state) => {
      this.loading = state;
    });
  }
  ngOnDestroy(): void {
    this.loading$.unsubscribe();
  }

  submit() {
    if (this.form.invalid) return this.popupMessageService.addMessage('Invalid data');
    if (this.loading) return this.popupMessageService.addMessage('Wait till we add the previous note');

    const lastTodo = this.todosService.getTodos().length;
    const groupId = this.todosService.getGroupId();

    const newTodo: TodoDTO = {
      completed: false,
      id: 0,
      description: this.form.get('description')?.value as string,
      order: lastTodo,
      groupId,
    };

    this.todosService.addNewTodo(newTodo);
  }

  toggleAddMode() {
    if (this.addMode) this.close();
    else this.open();
  }

  open() {
    this.addMode = true;
    this.focusInput();
  }

  close() {
    this.addMode = false;
    this.form.reset();
  }

  focusInput() {
    setTimeout(() => {
      if (this.input) this.input.nativeElement.focus();
    });
  }

  @HostListener('document:keydown.escape') closeOnEscape() {
    this.close();
  }
}
