import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-project-tab',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './project-tab.component.html',
  styleUrl: './project-tab.component.scss',
})
export class ProjectTabComponent implements OnInit {
  projectId?: number;

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
  }

  navigateToTaskList(): void {
    this.router.navigate(['task-list'], { relativeTo: this.route });
  }

  navigateToProjectBoard(): void {
    this.router.navigate(['project-board'], { relativeTo: this.route });
  }
  back_to_dashboard() {
    this.router.navigate(['dashboard']);
  }
}
