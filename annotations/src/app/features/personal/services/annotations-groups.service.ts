import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Group } from '../models/group.interface';

@Injectable({
  providedIn: 'root',
})
export class AnnotationsGroupsService {
  private groups = new BehaviorSubject<Group[]>([
    {
      id: '1',
      title: 'Group 1',
    },
    {
      id: '2',
      title: 'Group 2',
    },
    {
      id: '3',
      title: 'Group 3',
    },
  ]);
  groups$ = this.groups.asObservable();

  constructor() {}

  addGroup(group: Group) {
    this.groups.next([...this.groups.value, group]);
  }

  removeGroup(id: string) {
    this.groups.next(this.groups.value.filter((group) => group.id !== id));
  }

  updateGroup(group: Group) {
    this.groups.next(
      this.groups.value.map((g) => {
        if (g.id === group.id) return group;
        return g;
      })
    );
  }

  getGroup(id: string) {
    return this.groups.value.find((group) => group.id === id);
  }
}
