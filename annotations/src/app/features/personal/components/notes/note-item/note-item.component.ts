import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../../models/note.model';
import { EditIconComponent } from 'src/app/shared/components/icons/edit-icon/edit-icon.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckIconComponent } from 'src/app/shared/components/icons/check-icon/check-icon.component';
import { TrashIconComponent } from 'src/app/shared/components/icons/trash-icon/trash-icon.component';
import { NotesService } from '../../../services/notes.service';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [CommonModule, EditIconComponent, ReactiveFormsModule, CheckIconComponent, TrashIconComponent],
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
  host: { class: 'flex ' },
})
export class NoteItemComponent implements OnInit {
  @Input({ required: true }) note: Note = { id: 0, title: '', content: '' };
  form!: FormGroup;
  editMode = false;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.note.title, Validators.required),
      content: new FormControl(this.note.content, Validators.required),
    });
  }
  submitEdit() {
    console.log('asdas');
  }
  deleteTodo() {
    this.notesService.deleteNote(this.note.id);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.resetForm();
  }
  resetForm() {
    this.form.patchValue({
      title: this.note.title,
      content: this.note.content,
    });
  }
}
