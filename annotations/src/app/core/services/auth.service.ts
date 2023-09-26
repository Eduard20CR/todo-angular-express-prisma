import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  isLoggedIn(): Observable<boolean> {
    return this.http.get<{ message: string; data?: any }>(`${environment.API_URL}/api/auth/me`).pipe(
      map((res) => {
        if (res.data.validToken) {
          return true;
        } else {
          this.onError();
          return false;
        }
      }),
      catchError((err) => {
        this.onError();
        return throwError(() => err);
      })
    );
  }
  onError() {
    this.userService.deleteUser();
    this.router.navigate(['/sign-in']);
  }
}
