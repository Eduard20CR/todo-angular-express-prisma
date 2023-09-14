import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: '[app-add-group]',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent {
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
