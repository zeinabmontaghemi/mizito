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
        this.isError = true;
        this.isLoading = false;
      },
    });
  }

  navigateToProjectDetails(projectId?: number): void {
    this.router.navigate([`dashboard/project-details/${projectId}`]);
  }
}
