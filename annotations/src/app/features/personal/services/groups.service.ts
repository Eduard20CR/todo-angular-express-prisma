import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Group } from '../models/group.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/core/models/user.model';
import { PopupMessageService } from 'src/app/core/services/popup-message.service';

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

  constructor(private http: HttpClient, private popupMessageService: PopupMessageService) {}

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
    this.http.delete(`${environment.API_URL}/api/groups/${id}`).subscribe({
      next: (value) => {
        this.groups.next(this.groups.value.filter((group) => group.id !== id));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateGroup(group: Group) {
    this.groups.next(
      this.groups.value.map((g) => {
        if (g.id === group.id) return group;
        return g;
      })
    );
  }
  // getGroup(id: string) {
  //   return this.groups.value.find((group) => group.id === id);
  // }
}
