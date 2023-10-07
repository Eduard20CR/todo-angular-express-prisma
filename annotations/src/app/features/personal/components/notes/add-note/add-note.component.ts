import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusIconComponent } from 'src/app/shared/components/icons/plus-icon/plus-icon.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrashIconComponent } from 'src/app/shared/components/icons/trash-icon/trash-icon.component';
import { NotesService } from '../../../services/notes.service';
import { Note } from '../../../models/note.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [CommonModule, PlusIconComponent, ReactiveFormsModule, PlusIconComponent, TrashIconComponent],
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
  host: { class: 'flex ' },
})
export class AddNoteComponent implements OnInit, OnDestroy {
  @ViewChild('inputNewNote', { static: false }) input!: ElementRef<HTMLInputElement>;
  resetForm$!: Subscription;
  active = false;

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.min(1), Validators.max(255)]),
    content: new FormControl('', [Validators.required, Validators.min(1), Validators.max(255)]),
  });

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.resetForm$ = this.notesService.resetForm$.subscribe(() => {
      this.resetForm();
    });
  }
  ngOnDestroy(): void {
    this.resetForm$.unsubscribe();
  }

  toggleMode() {
    if (this.active) this.close();
    else this.open();
  }

  open() {
    this.active = true;
    this.focusInput();
  }

  close() {
    this.active = false;
    this.resetForm();
  }

  resetForm() {
    this.form.reset();
  }

  focusInput() {
    setTimeout(() => {
      if (this.input) this.input.nativeElement.focus();
    });
  }

  submit() {
    const newNote: Note = {
      id: 0,
      title: this.form.get('title')?.value as string,
      content: this.form.get('content')?.value as string,
    };

    this.notesService.addNote(newNote);
  }

  @HostListener('document:keydown.escape') closeOnEscape() {
    this.close();
  }
}
