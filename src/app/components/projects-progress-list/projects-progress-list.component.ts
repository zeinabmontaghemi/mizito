import { Component, OnInit } from '@angular/core';
import { ProjectStatusComponent } from '../project-status/project-status.component';
import { Project } from '../../models/task';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-progress-list',
  standalone: true,
  imports: [ProjectStatusComponent],
  templateUrl: './projects-progress-list.component.html',
  styleUrl: './projects-progress-list.component.scss',
})
export class ProjectsProgressListComponent implements OnInit {
  projects: Project[] = [];
  isLoading = true;
  isError = false;

  constructor(private projectService: ProjectService, private router: Router) {}
  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.isLoading = false;
      },
      error: () => {
        this.projects = this.getDefaultProjects();
        /////change this if data fetch correctly to true
        this.isError = false;
        this.isLoading = false;
      },
    });
  }

  navigateToProjectDetails(projectId?: number): void {
    this.router.navigate([`mizito/dashboard/project-details/${projectId}`]);
  }
  getDefaultProjects(): Project[] {
    // Return default data when the fetch fails
    return [
      {
        id: 1,
        name: 'Test Project A',
        teamId: 101,
        members: [],
        createdAt: '2025-01-10',
        updatedAt: '2025-01-12',
        imageUrl: 'assets/project.jpg',
      },
      {
        id: 2,
        name: 'Test Project B',
        teamId: 102,
        members: [],
        createdAt: '2025-01-05',
        updatedAt: '2025-01-15',
        imageUrl: 'assets/project.jpg',
      },
      {
        id: 3,
        name: 'Test Project C',
        teamId: 103,
        members: [],
        createdAt: '2025-01-01',
        updatedAt: '2025-01-10',
        imageUrl: 'assets/project.jpg',
      },
    ];
  }
}
