import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, debounceTime, first, map, of, switchMap } from 'rxjs';
import { SignUpService } from '../services/sign-up.service';

export function emailAlreadyRegisteredValidator(authService: SignUpService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return control.valueChanges.pipe(
      debounceTime(300),
      switchMap((email) => {
        return authService.emailAlreadyRegistered(email).pipe(
          catchError((error) => {
            switch (error?.status ?? 500) {
              case 404:
                return of({ email: true });
              default:
                return of({ server: true });
            }
          })
        );
      }),
      map((exists) => {
        if ('server' in exists) return { server: true };
        if ('email' in exists) return { email: true };
        if ('exists' in exists) return exists.exists ? { emailAlreadyRegistered: true } : null;
        return null;
      }),
      first()
    );
  };
}
