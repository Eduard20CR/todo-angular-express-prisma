import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserSignInDTO } from '../models/login.models';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  apiErrors = new BehaviorSubject<string[]>([]);
  loading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  signIn(value: UserSignInDTO) {
    return this.http.post(`${environment.API_URL}/api/auth/sign-up`, value).subscribe({
      next: (value) => {
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
