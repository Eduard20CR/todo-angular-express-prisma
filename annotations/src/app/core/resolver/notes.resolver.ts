import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { NoteGroup } from 'src/app/features/personal/models/note.model';
import { NotesService } from 'src/app/features/personal/services/notes.service';
import { ApiResponse } from '../models/user.model';

export const notesResolver: ResolveFn<NoteGroup> = (route, state) => {
  const notesService = inject(NotesService);
  const id = route.params['id'];
  return notesService.fetchNotes(id);
};
