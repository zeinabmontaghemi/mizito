import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  isError = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Load all users
  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: () => {
        this.isError = true;
        this.isLoading = false;
      },
    });
  }

  // Delete a user
  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== userId);
      },
      error: () => {
        console.error('Failed to delete user');
      },
    });
  }

  // Edit a user (example with hardcoded data)
  editUser(userId: number): void {
    const updatedUserData = {
      username: 'Updated User',
      email: 'updated.email@example.com',
      userRole: 'ROLE_USER',
      password: 'newpassword',
      active: true,
    };
    this.userService.updateUser(userId, updatedUserData).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex((user) => user.id === userId);
        this.users[index] = updatedUser;
      },
      error: () => {
        console.error('Failed to update user');
      },
    });
  }
}
