import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsHelpersService {
  constructor() {}

  isFormInvalidAndInput(form: FormGroup, field: string) {
    return form.invalid && (form.get(field)?.dirty || form.get(field)?.touched);
  }
  isInputInvalid(form: FormGroup, field: string) {
    return form.get(field)?.invalid && (form.get(field)?.dirty || form.get(field)?.touched);
  }

  hasFormError(form: FormGroup, error: string) {
    return form?.errors?.[error];
  }
  hasError(form: FormGroup, field: string, error: string) {
    return form.get(field)?.errors?.[error];
  }
}
