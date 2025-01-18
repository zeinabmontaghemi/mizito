import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProgressServiceService } from '../../services/progress-service.service';

@Component({
  selector: 'app-project-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-status.component.html',
  styleUrl: './project-status.component.scss',
})
export class ProjectStatusComponent implements OnInit {
  @Input() projectId!: number;
  progress: number = 0;
  isLoading: boolean = true;

  constructor(private progressService: ProgressServiceService) {}

  ngOnInit(): void {
    if (this.projectId) {
      this.loadProjectProgress();
    }
  }

  loadProjectProgress(): void {
    this.progressService.calculateProjectProgress(this.projectId).subscribe({
      next: (progress) => {
        this.progress = progress;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching project progress:', err);
        this.isLoading = false;
      },
    });
  }
}
