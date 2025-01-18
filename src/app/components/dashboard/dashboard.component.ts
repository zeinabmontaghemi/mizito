import { Component, OnInit } from '@angular/core';
import { DeskListComponent } from '../desk-list/desk-list.component';
import { ProfileComponent } from '../profile/profile.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { WorkDeskComponent } from '../work-desk/work-desk.component';

import { SideBarComponent } from '../side-bar/side-bar.component';
import { SidebarService } from '../../services/sidebar.service';
import { ProjectsProgressListComponent } from '../projects-progress-list/projects-progress-list.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DeskListComponent,
    ProfileComponent,
    NavBarComponent,
    WorkDeskComponent,
    ProjectsProgressListComponent,
    SideBarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = false;
  isAdmin: boolean = false;
  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin; // Update admin status when it changes
    });
    this.sidebarService.isSidebarOpen$.subscribe((state) => {
      this.isSidebarOpen = state;
    });
  }
}
