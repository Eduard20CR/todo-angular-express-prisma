import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/user.model';
import { PopupMessageService } from 'src/app/core/services/popup-message.service';
import { environment } from 'src/environments/environment';
import { Note, NoteGroup } from '../models/note.model';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notes = new BehaviorSubject<Note[]>([]);
  private name = new BehaviorSubject<string>('Notes');
  notes$ = this.notes.asObservable();
  name$ = this.name.asObservable();

  constructor(private http: HttpClient, private popupMessageService: PopupMessageService, private router: Router) {}

  emitNotes(notes: Note[]) {
    this.notes.next(notes);
  }

  emitName(name: string) {
    this.name.next(name);
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
}
