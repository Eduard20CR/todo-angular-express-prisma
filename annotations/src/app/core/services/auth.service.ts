import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { ApiResponse, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  isLoggedIn(): Observable<boolean> {
    return this.http.get<ApiResponse<User>>(`${environment.API_URL}/api/auth/me`).pipe(
      map((res) => {
        if (res.data) {
          return true;
        } else {
          this.userService.logOut();
          return false;
        }
      }),
      catchError((err) => {
        this.userService.logOut();
        return throwError(() => err);
      })
    );
  }
}
