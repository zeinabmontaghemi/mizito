import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-status.component.html',
  styleUrl: './project-status.component.scss',
})
export class ProjectStatusComponent {
  @Input() progress: number = 0;
}
