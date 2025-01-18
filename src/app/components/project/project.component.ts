import { Component } from '@angular/core';
import { ProjectTabComponent } from '../project-tab/project-tab.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ProjectTabComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  navigateToTaskList(): void {
    this.router.navigate(['task-list'], { relativeTo: this.route });
  }

  navigateToProjectBoard(): void {
    this.router.navigate(['project-board'], { relativeTo: this.route });
  }
}
