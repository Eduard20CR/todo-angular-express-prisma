import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, throwError, timeout } from 'rxjs';
import { UserSignUpDTO, emailAlreadyRegisteredValidator } from '../models/login.models';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  apiErrors = new BehaviorSubject<string[]>([]);
  loading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(value: UserSignUpDTO) {
    this.loading.next(true);
    return this.http.post(`${environment.API_URL}/api/auth/sign-up`, value).subscribe({
      next: (value) => {
        this.router.navigate(['/sign-in']);
        this.resetSubjects();
      },
      error: (res) => {
        switch (res.status) {
          case 400:
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

  emailAlreadyRegistered(email: string): Observable<emailAlreadyRegisteredValidator> {
    return this.http.post<emailAlreadyRegisteredValidator>(`${environment.API_URL}/api/auth/email-already-registered/`, { email });
  }

  private resetSubjects() {
    this.apiErrors.next([]);
    this.loading.next(false);
  }
}
