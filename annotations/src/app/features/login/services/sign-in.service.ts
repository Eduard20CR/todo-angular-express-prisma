import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserSignInDTO, UserSignInResponse } from '../models/login.models';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private apiErrors = new BehaviorSubject<string[]>([]);
  private loading = new BehaviorSubject<boolean>(false);
  get apiErrors$() {
    return this.apiErrors.asObservable();
  }
  get loading$() {
    return this.loading.asObservable();
  }

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  signIn(value: UserSignInDTO) {
    this.loading.next(true);
    return this.http.post<UserSignInResponse>(`${environment.API_URL}/api/auth/sign-in`, value).subscribe({
      next: (res) => {
        this.userService.emitUser(res.data.user);
        this.router.navigate(['/personal']);
      },
      error: (res) => {
        switch (res.status) {
          case 400:
            this.apiErrors.next(res.error.errors);
            break;
          case 401:
            this.apiErrors.next(res.error.errors);
            break;
          case 500:
            this.apiErrors.next(['Server error']);
            break;
          default:
            this.apiErrors.next(['Server Error']);
            break;
        }
        this.loading.next(false);
      },
    });
  }
  resetSubjects() {
    this.apiErrors.next([]);
    this.loading.next(false);
  }
}
