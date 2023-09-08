import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    console.log(password?.value, confirmPassword?.value);
    return password === confirmPassword
      ? null
      : { forbiddenName: { value: control.value } };
  };
}
