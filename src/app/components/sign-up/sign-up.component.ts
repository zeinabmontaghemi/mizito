import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignupForm } from '../../models/signup-form';
import { AuthService } from '../../services/auth.service';
import { passwordValidator } from '../../customValidators/passwordValidator';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { SignUpInfo } from '../../models/sign-up-info';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signUpForm: FormGroup<SignupForm>;
  formIsValid = true;
  successMessage = '';
  errorMessage = '';
  isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group<SignupForm>({
      username: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      password: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required, passwordValidator()],
      }),
      //validation of confirm password
      confirmPassword: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  addUser() {
    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;

    if (this.signUpForm.valid) {
      const signUpInfo: SignUpInfo = this.signUpForm.value as SignUpInfo;

      this.authService.signup(signUpInfo).subscribe({
        next: () => {
          this.successMessage = 'User signed up successfully!';
          this.signUpForm.reset();
          this.router.navigate(['mizito/dashboard']);
          // Fetch user data after signup to determine admin status
          // this.userService.getUser().subscribe({
          //   next: (user) => {
          // const isAdmin = user.userRole === 'ROLE_ADMIN';
          // this.authService.setAdminStatus(isAdmin);

          // },
          // error: (err) => {
          //   this.isLoading = false;
          //   this.errorMessage = 'Failed to fetch user data after signup.';
          //   console.error('Error fetching user data:', err);
          // },
          // complete: () => {
          //   this.isLoading = false;
          // },
          // });
        },
        error: (error) => {
          this.isLoading = false;
          if (error.status === 401) {
            this.errorMessage = 'Authentication is required.';
          } else if (error.status === 403) {
            this.errorMessage =
              'You do not have permission to perform this action.';
          } else {
            this.errorMessage =
              error.error || 'An error occurred while adding the user.';
          }
          console.error('Signup error:', error);
        },
      });
    } else {
      this.isLoading = false;
      this.formIsValid = false;
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  back_to_login() {
    this.router.navigate(['mizito']);
  }
}
