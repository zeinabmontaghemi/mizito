import { FormControl, FormGroup } from '@angular/forms';

export interface SignupForm {
  username: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  email: FormControl<string>;
}
