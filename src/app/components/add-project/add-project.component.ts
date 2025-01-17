import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
})
export class AddProjectComponent {
  projectForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: [''],
    });
  }

  createProject(): void {
    if (this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value).subscribe({
        next: (project) => {
          console.log('Project created:', project);
          // Navigate or provide feedback to the user
        },
        error: (err) => {
          console.error('Error creating project:', err);
        },
      });
    }
  }
}
