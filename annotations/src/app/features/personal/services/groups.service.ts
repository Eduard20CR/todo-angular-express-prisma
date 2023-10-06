import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Group } from '../models/group.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/core/models/user.model';
import { PopupMessageService } from 'src/app/core/services/popup-message.service';
import { NotesService } from './notes.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private groups = new BehaviorSubject<Group[]>([
    {
      id: '1',
      name: 'Group 1',
    },
    {
      id: '2',
      name: 'Group 2',
    },
    {
      id: '3',
      name: 'Group 3',
    },
  ]);
  private loading = new BehaviorSubject<boolean>(false);
  groups$ = this.groups.asObservable();
  loading$ = this.loading.asObservable();

  constructor(private http: HttpClient, private popupMessageService: PopupMessageService, private notesService: NotesService, private router: Router) {}

  fetchGroups() {
    this.loading.next(true);
    this.http.get<ApiResponse<Group[]>>(`${environment.API_URL}/api/groups`).subscribe({
      next: (res) => {
        this.groups.next(res.data);
        this.loading.next(false);
      },
      error: (err) => {
        this.popupMessageService.addMessage('Could not load groups');
        this.loading.next(false);
      },
    });
  }
  addGroup(group: Group) {
    this.http.post<ApiResponse<Group>>(`${environment.API_URL}/api/groups`, group).subscribe({
      next: (value) => {
        this.groups.next([...this.groups.value, value.data]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteGroup(id: string) {
    this.http.delete<ApiResponse<string>>(`${environment.API_URL}/api/groups/${id}`).subscribe({
      next: (value) => {
        const filteredGroups = this.groups.value.filter((group) => group.id != id);
        this.groups.next(filteredGroups);
        this.router.navigate(['/personal']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateGroup({ name, id }: Group) {
    this.http.put<ApiResponse<Group>>(`${environment.API_URL}/api/groups/${id}`, { name }).subscribe({
      next: (value) => {
        const newGroups = this.groups.value.map((group) => {
          const isEditedGroup = group.id === value.data.id;
          return isEditedGroup ? value.data : group;
        });
        this.notesService.emitName(value.data.name);
        this.groups.next(newGroups);
      },
      error: (err) => {
        console.log(err);
        this.popupMessageService.addMessage('Could not edit group');
      },
    });
  }
  // getGroup(id: string) {
  //   return this.groups.value.find((group) => group.id === id);
  // }
}
