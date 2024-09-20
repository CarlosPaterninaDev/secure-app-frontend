import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { email: 'Email is required' };
    }

    // Expresión regular para validar el email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validar si el valor cumple con el formato de email
    const valid = emailRegex.test(value);

    return valid ? null : { email: 'Invalid email format' };
  };
}
