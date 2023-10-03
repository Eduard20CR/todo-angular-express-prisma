import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/user.model';
import { PopupMessageService } from 'src/app/core/services/popup-message.service';
import { environment } from 'src/environments/environment';
import { NoteGroup } from '../models/note.model';
import { catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient, private popupMessageService: PopupMessageService) {}

  fetchNotes(groupsId: string) {
    return this.http.get<ApiResponse<NoteGroup>>(`${environment.API_URL}/api/notes/${groupsId}`).pipe(
      map((res) => res.data),
      catchError((err) => {
        this.popupMessageService.addMessage('Could not load notes');

        const errorData: NoteGroup = {
          id: '',
          name: '',
          notes: [],
        };

        return of(errorData);
      })
    );
  }
}
