import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SignInForm } from '../../models/sign-in-form';
import { SignInfo } from '../../models/sign-info';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  signInForm: FormGroup<SignInForm>;
  isLoading = false;
  signinError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    // Initialize the login form with validation rules
    this.signInForm = this.formBuilder.group<SignInForm>({
      username: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      password: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  login(): void {
    if (this.signInForm.valid) {
      this.isLoading = true;
      this.signinError = null;

      const signInfo: SignInfo = this.signInForm.value as SignInfo;

      this.authService.login(signInfo).subscribe({
        next: () => {
          this.userService.getUser().subscribe((user) => {
            const isAdmin = user.userRole === 'ROLE_ADMIN';
            this.authService.setAdminStatus(isAdmin);
            this.isLoading = false;
            this.router.navigate(['mizito/dashboard']);
          });
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Login error:', err);
          this.signinError =
            err.status === 400
              ? 'Invalid username or password. Please try again.'
              : 'An unexpected error occurred. Please try later.';
        },
      });
    } else {
      this.signinError = 'Please fill out all required fields.';
    }
  }

  back_to_login() {
    this.router.navigate(['mizito']);
  }
}
