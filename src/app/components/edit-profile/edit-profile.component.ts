import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  userProfileImage = 'assets/download.png';
  userId!: number; // The user ID from the route params
  editProfileForm!: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private AuthService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
      username: [''],
      password: [''],
      email: [''],
      role: [''],
      image: [''],
      active: [''],
    });

    this.userId = Number(this.activatedRoute.snapshot.paramMap.get('id') || 0);

    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.createForm(user);
      },
      error: () => {
        this.errorMessage = 'Error fetching users.';
      },
    });
  }

  createForm(user: User): void {
    this.editProfileForm.setValue({
      username: user.username,
      password: user.password,
      email: user.email,
      role: user.userRole,
      active: user.active,
      image: user.imageUrl,
    });
  }

  updateUser(): void {
    if (this.editProfileForm.valid) {
      const updatedUser: User = {
        ...this.editProfileForm.value,
        active: Boolean(this.editProfileForm.value.active),
      };

      this.userService.updateUser(this.userId, updatedUser).subscribe({
        next: () => {
          this.successMessage = 'User updated successfully!';
          /////////////////////////////////////////////create the rout after every rout was complete
          this.router.navigate(['mizito/dashboard']);
        },
        error: () => {
          this.errorMessage = 'An error occurred while updating the user.';
        },
      });
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
  logout(): void {
    this.AuthService.logout();
    this.router.navigate(['mizito']);
  }
}
