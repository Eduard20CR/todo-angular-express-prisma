import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../../models/note.interface';
import { EditIconComponent } from 'src/app/shared/components/icons/edit-icon/edit-icon.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckIconComponent } from 'src/app/shared/components/icons/check-icon/check-icon.component';
import { TrashIconComponent } from 'src/app/shared/components/icons/trash-icon/trash-icon.component';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [CommonModule, EditIconComponent, ReactiveFormsModule, CheckIconComponent, TrashIconComponent],
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
  host: { class: 'flex ' },
})
export class NoteItemComponent implements OnInit {
  @Input({ required: true }) note: Note = { id: 0, title: '', description: '' };
  form!: FormGroup;
  editMode = false;

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.note.title, Validators.required),
      description: new FormControl(this.note.description, Validators.required),
    });
  }
  submitEdit() {
    console.log('asdas');
  }
  deleteTodo() {}

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.resetForm();
  }
  resetForm() {
    this.form.patchValue({
      title: this.note.title,
      description: this.note.description,
    });
  }
}
