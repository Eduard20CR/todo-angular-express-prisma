import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusIconComponent } from 'src/app/shared/components/icons/plus-icon/plus-icon.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: '[app-add-todo]',
  standalone: true,
  imports: [CommonModule, PlusIconComponent, ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  host: { class: 'text-gray bg-black flex items-center gap-8 py-4 px-8' },
})
export class AddTodoComponent {
  @ViewChild('inputNewTodo', { static: false }) input!: ElementRef<HTMLInputElement>;
  form = new FormGroup({
    description: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  });

  addMode = false;

  submit() {
    console.log(this.form.value);
  }

  toggleAddMode() {
    this.addMode = !this.addMode;
    if (this.addMode) this.open();
    else this.close();
  }

  open() {
    this.focusInput();
  }

  close() {
    this.form.reset();
  }

  focusInput() {
    setTimeout(() => {
      if (this.input) this.input.nativeElement.focus();
    });
  }
}
