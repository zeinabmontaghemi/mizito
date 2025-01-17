import { Component } from '@angular/core';
import { DeskListComponent } from '../desk-list/desk-list.component';
import { ProfileComponent } from '../profile/profile.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { WorkDeskComponent } from '../work-desk/work-desk.component';
import { ProjectListComponent } from '../project-list/project-list.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DeskListComponent,
    ProfileComponent,
    NavBarComponent,
    WorkDeskComponent,
    ProjectListComponent,
    SideBarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isSidebarOpen = false;
  constructor(private sidebarService: SidebarService) {}
  ngOnInit(): void {
    // Subscribe to the sidebar state to keep track of updates
    this.sidebarService.isSidebarOpen$.subscribe((state) => {
      this.isSidebarOpen = state;
    });
  }
}
