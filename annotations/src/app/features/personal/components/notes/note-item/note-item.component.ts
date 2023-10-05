import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../../models/note.model';
import { EditIconComponent } from 'src/app/shared/components/icons/edit-icon/edit-icon.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckIconComponent } from 'src/app/shared/components/icons/check-icon/check-icon.component';
import { TrashIconComponent } from 'src/app/shared/components/icons/trash-icon/trash-icon.component';
import { NotesService } from '../../../services/notes.service';
import { PopupMessageService } from 'src/app/core/services/popup-message.service';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [CommonModule, EditIconComponent, ReactiveFormsModule, CheckIconComponent, TrashIconComponent, MarkdownModule],
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
  host: { class: 'flex ' },
})
export class NoteItemComponent implements OnInit {
  @Input({ required: true }) note: Note = { id: 0, title: '', content: '' };
  form!: FormGroup;
  editMode = false;

  constructor(private notesService: NotesService, private popupMessageService: PopupMessageService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.note.title, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
      content: new FormControl(this.note.content, [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]),
    });
  }
  submitEdit() {
    if (this.form.invalid) return;

    const editedNote: Note = {
      ...this.note,
    };
    const title = this.form.get('title')?.value;
    const content = this.form.get('content')?.value;

    if (title !== this.note.title) {
      editedNote.title = title;
    }
    if (content !== this.note.content) {
      editedNote.content = content;
    }

    if (JSON.stringify(editedNote) !== JSON.stringify(this.note)) {
      this.notesService.editNote(editedNote);
    } else {
      this.popupMessageService.addMessage('No changes made');
    }
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
