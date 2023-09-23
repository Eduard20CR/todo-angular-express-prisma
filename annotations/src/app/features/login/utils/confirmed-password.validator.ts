import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmationPassword = control.get('confirmationPassword');

    return password?.value === confirmationPassword?.value ? null : { confirmationPassword: { value: control.value } };
  };
}
