import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserSignInDTO, UserSignInResponse } from '../models/login.models';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  apiErrors = new BehaviorSubject<string[]>([]);
  loading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  signIn(value: UserSignInDTO) {
    this.loading.next(true);
    return this.http.post<UserSignInResponse>(`${environment.API_URL}/api/auth/sign-in`, value).subscribe({
      next: (res) => {
        this.resetSubjects();
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

  private resetSubjects() {
    this.apiErrors.next([]);
    this.loading.next(false);
  }
}
