import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  constructor(private router: Router) {}
  navigateToProjectsList() {
    this.router.navigate(['mizito/dashboard/project-list']);
  }

  navigateToTaskList() {
    this.router.navigate(['mizito/dashboard/task-list']);
  }
}
