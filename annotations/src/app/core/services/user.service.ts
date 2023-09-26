import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  get user$() {
    return this.user.asObservable();
  }

  emitUser(user: User | null) {
    this.user.next(user);
  }

  deleteUser() {
    this.user.next(null);
  }

  fetchUser() {
    return this.http.get<User>(`${environment.API_URL}/api/auth/me`).subscribe({
      next: (user) => {
        this.emitUser(user);
      },
      error: (err) => {
        this.emitUser(null);
      },
    });
  }
}
