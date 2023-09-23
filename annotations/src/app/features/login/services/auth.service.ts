import { Injectable, inject } from '@angular/core';
import { UserSignInDTO, UserSignUpDTO } from '../models/login.models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  signUp(value: UserSignUpDTO) {
    console.log('asdasd');

    return this.http.post(`${environment.API_URL}/api/auth/sign-up`, value).subscribe({
      next(value) {
        console.log(value);
      },
      error(error) {
        console.log(error);
      },
      complete() {
        console.log('complete');
      },
    });
  }

  signIn(value: UserSignInDTO) {}

  emailAlreadyRegistered(email: string): Observable<{ exists: boolean }> {
    return this.http.post<{ exists: boolean }>(`${environment.API_URL}/api/auth/email-already-registered/`, { email });
  }
}
