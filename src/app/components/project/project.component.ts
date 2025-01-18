import { Component, OnInit } from '@angular/core';
import { ProjectTabComponent } from '../project-tab/project-tab.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/task';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ProjectTabComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  projectId: number | undefined;
  project: Project | undefined;
  isLoading = true;
  isError = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ProjectService: ProjectService
  ) {}
  navigateToTaskList(): void {
    this.router.navigate(['task-list'], { relativeTo: this.route });
  }

  navigateToProjectBoard(): void {
    this.router.navigate(['project-board'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    // Extract the projectId from the route parameter
    this.route.params.subscribe((params) => {
      this.projectId = +params['id']; // Convert to number
      if (this.projectId) {
        this.loadProjectDetails(this.projectId);
      }
    });
  }

  loadProjectDetails(projectId: number): void {
    this.ProjectService.getProjectById(projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.isLoading = false;
      },
      error: () => {
        this.isError = true;
        this.isLoading = false;
      },
    });
  }
}
