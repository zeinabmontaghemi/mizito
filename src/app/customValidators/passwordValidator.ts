import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|<>?])[A-Za-z\d!@#$%^&*()_+{}|<>?]{6,}$/;

    if (control.value && !passwordRegex.test(control.value)) {
      return {
        invalidPassword: { value: control.value },
      };
    }
    return null;
  };
}
