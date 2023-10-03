import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteItemComponent } from '../note-item/note-item.component';
import { AddNoteComponent } from '../add-note/add-note.component';
import { NotesService } from '../../../services/notes.service';

@Component({
  selector: 'app-note-group',
  standalone: true,
  imports: [CommonModule, NoteItemComponent, AddNoteComponent],
  templateUrl: './note-group.component.html',
  styleUrls: ['./note-group.component.scss'],
})
export class NoteGroupComponent {
  notes = this.notesServices.notes$;

  constructor(private notesServices: NotesService) {}
}
