import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiResponse, User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { PopupMessageService } from './popup-message.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private router: Router, private popupMessageService: PopupMessageService) {}

  emitUser(user: User | null) {
    this.user.next(user);
  }

  fetchUser() {
    return this.http.get<ApiResponse<User>>(`${environment.API_URL}/api/auth/me`).subscribe({
      next: (res) => {
        this.emitUser(res.data);
      },
      error: (err) => {
        this.emitUser(null);
      },
    });
  }

  logOut() {
    this.http.get(`${environment.API_URL}/api/auth/log-out`).subscribe({
      next: (res) => {
        this.emitUser(null);
        this.router.navigate(['/sign-in']);
      },
      error: (err) => {
        this.popupMessageService.addMessage('Server error');
      },
    });
  }
}
