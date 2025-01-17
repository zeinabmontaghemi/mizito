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
        this.isError = true;
        this.isLoading = false;
      },
    });
  }

  navigateToProjectDetails(projectId?: number): void {
    this.router.navigate([`dashboard/project-details/${projectId}`]);
  }
  createNewProject(): void {
    this.router.navigate(['dashboard/create-project']);
  }
  // deleteProject(projectId: number): void {
  //   this.projectService.deleteProject(projectId).subscribe({
  //     next: () => {
  //       this.projects = this.projects.filter(
  //         (project) => project.id !== projectId
  //       );
  //     },
  //     error: () => {
  //       console.error('Failed to delete project');
  //     },
  //   });
  // }
  onDragEnd(event: any): void {
    // Handle reordering logic here if needed.
    console.log('New layout after drag:', event);
  }
}
