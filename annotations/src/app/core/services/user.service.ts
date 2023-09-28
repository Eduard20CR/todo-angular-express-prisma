import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, UserRes } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<User | null>(null);
  get user$() {
    return this.user.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) {}

  emitUser(user: User | null) {
    this.user.next(user);
  }
  deleteUser() {
    this.user.next(null);
  }
  fetchUser() {
    return this.http.get<UserRes>(`${environment.API_URL}/api/auth/me`).subscribe({
      next: (res) => {
        this.emitUser(res.data.user);
      },
      error: (err) => {
        this.emitUser(null);
      },
    });
  }
  logOut() {
    this.http.get(`${environment.API_URL}/api/auth/log-out`).subscribe({
      next: (res) => {
        console.log(res);
        this.emitUser(null);
        this.router.navigate(['/']);
      },
      error: (err) => {
        // this.emitUser(null);
      },
    });
  }
}
