import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/task';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { ProjectStatusComponent } from '../project-status/project-status.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectStatusComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit {
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
        this.isError = true;
        this.isLoading = false;
      },
    });
  }

  navigateToProjectDetails(projectId?: number): void {
    this.router.navigate([`mizito/dashboard/project-details/${projectId}`]);
  }
  createNewProject(): void {
    this.router.navigate(['mizito/dashboard/create-project']);
  }

  onDragEnd(event: any): void {
    // Handle reordering logic here if needed.
    console.log('New layout after drag:', event);
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
