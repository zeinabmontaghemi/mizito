import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userProfileImage = 'assets/download.png';
  username = '';
  userRole = '';
  userStatus = ''; // offline
  systemTime: string | null = null;

  userId: number | null | undefined = null;
  isLoading = true;
  isError = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.updateSystemTime();
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.username = user.username;
        this.userRole = user.userRole;
        this.userId = user.id;
        this.userStatus = user.active ? 'online' : 'offline';
        this.systemTime = new Intl.DateTimeFormat('en-US', {
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date());
        if (user.imageUrl) {
          this.userProfileImage = user.imageUrl;
        }
        this.isLoading = false;
      },
      error: () => {
        this.isError = true;
        this.isLoading = false;
      },
    });
    this.isLoading = false;
  }

  navigateToEditProfile(): void {
    this.router.navigate([`dashboard/edit-profile/${this.userId}`]);
  }

  updateSystemTime(): void {
    setInterval(() => {
      this.systemTime = new Date().toLocaleString();
    }, 1000); // Updates every second
  }
}
