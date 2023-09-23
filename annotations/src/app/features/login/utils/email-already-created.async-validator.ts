import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, switchMap, timer } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function emailAlreadyRegisteredValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return timer(500).pipe(
      switchMap(() =>
        authService.emailAlreadyRegistered(control.value).pipe(
          map((result: { exists: boolean }) => {
            console.log(result);
            return result.exists ? { emailAlreadyRegistered: true } : null;
          })
        )
      )
    );
  };
}
