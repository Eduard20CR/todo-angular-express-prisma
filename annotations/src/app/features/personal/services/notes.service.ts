import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/user.model';
import { PopupMessageService } from 'src/app/core/services/popup-message.service';
import { environment } from 'src/environments/environment';
import { Note, NoteDTO, NoteGroup } from '../models/note.model';
import { BehaviorSubject, Subject, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notes = new BehaviorSubject<Note[]>([]);
  private name = new BehaviorSubject<string>('Notes');
  private resetForm = new Subject<void>();
  notes$ = this.notes.asObservable();
  name$ = this.name.asObservable();
  resetForm$ = this.resetForm.asObservable();
  private groupId = '';

  constructor(private http: HttpClient, private popupMessageService: PopupMessageService, private router: Router) {}

  emitNotes(notes: Note[]) {
    this.notes.next(notes);
  }
  emitName(name: string) {
    this.name.next(name);
  }
  setGroupId(id: string) {
    this.groupId = id;
  }
  getGroupId() {
    return this.groupId;
  }

  fetchNotes(groupsId: string) {
    return this.http.get<ApiResponse<NoteGroup>>(`${environment.API_URL}/api/notes/${groupsId}`).pipe(
      map((res) => {
        return res.data;
      }),
      catchError((err) => {
        console.log(err);
        this.popupMessageService.addMessage('Could not load notes');

        const errorData: NoteGroup = {
          id: '',
          name: '',
          notes: [],
        };

        this.router.navigate(['/personal']);
        return of(errorData);
      })
    );
  }
  addNote(newNote: Note) {
    const body: NoteDTO = {
      ...newNote,
      groupId: this.groupId,
    };

    this.http.post<ApiResponse<Note>>(`${environment.API_URL}/api/notes/`, body).subscribe({
      next: (res) => {
        this.notes.next([...this.notes.getValue(), res.data]);
        this.resetForm.next();
      },
      error: (err) => {
        console.log(err);
        this.popupMessageService.addMessage('Could not add note');
      },
    });
  }
  deleteNote(id: number) {
    this.http.delete<ApiResponse<Note>>(`${environment.API_URL}/api/notes/${id}`).subscribe({
      next: (res) => {
        const newNotes = this.notes.getValue().filter((note) => note.id !== id);
        this.notes.next(newNotes);
      },
      error: (err) => {
        console.log(err);
        this.popupMessageService.addMessage('Could not delete note');
      },
    });
  }
  editNote({ id, ...note }: Note) {
    this.http.put<ApiResponse<Note>>(`${environment.API_URL}/api/notes/${id}`, { ...note }).subscribe({
      next: (res) => {
        const newNotes = this.notes.getValue().map((note) => {
          if (note.id === id) {
            return res.data;
          }
          return note;
        });
        this.notes.next(newNotes);
      },
      error: (err) => {
        console.log(err);
        this.popupMessageService.addMessage('Could not edit note');
      },
    });
  }
}
