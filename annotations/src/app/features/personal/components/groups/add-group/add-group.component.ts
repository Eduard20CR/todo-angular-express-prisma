import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { PlusIconComponent } from 'src/app/shared/components/icons/plus-icon/plus-icon.component';
import { AnnotationsGroupsService } from '../../../services/annotations-groups.service';

@Component({
  selector: '[app-add-group]',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PlusIconComponent],
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
  host: { class: 'flex  min-h-[5rem] items-stretch' },
})
export class AddGroupComponent {
  annotationsGroupsService = inject(AnnotationsGroupsService);
  @ViewChild('inputNewTodo', { static: false }) input!: ElementRef<HTMLInputElement>;
  form = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  });
  addMode = false;

  submit() {
    if (this.form.invalid) return;
    this.annotationsGroupsService.addGroup({ id: Date.now().toString(), title: this.form.get('title')?.value ?? '' });
    this.form.reset();
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
