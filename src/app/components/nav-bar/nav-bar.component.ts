import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(
    private AuthService: AuthService,
    private sidebarService: SidebarService,
    private router: Router
  ) {}
  logout(): void {
    this.AuthService.logout();
    this.router.navigate(['mizito']);
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
