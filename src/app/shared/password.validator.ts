import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { password: 'Password is required' };
    }

    // Validar longitud mínima
    if (value.length < 8) {
      return { password: 'Password must be at least 8 characters long' };
    }

    // Validar que tenga al menos una mayúscula
    const hasUpperCase = /[A-Z]/.test(value);
    if (!hasUpperCase) {
      return { password: 'Password must have at least one uppercase letter' };
    }

    // Validar que tenga al menos una minúscula
    const hasLowerCase = /[a-z]/.test(value);
    if (!hasLowerCase) {
      return { password: 'Password must have at least one lowercase letter' };
    }

    // Validar que tenga al menos un número
    const hasNumber = /\d/.test(value);
    if (!hasNumber) {
      return { password: 'Password must have at least one number' };
    }

    // Validar que tenga al menos un carácter especial
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    if (!hasSpecialChar) {
      return { password: 'Password must have at least one special character' };
    }

    // Si todas las validaciones pasan, devolver null
    return null;
  };
}
