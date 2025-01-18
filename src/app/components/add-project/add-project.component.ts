import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { AddProject } from '../../models/addProject';
import { Project } from '../../models/task';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
})
export class AddProjectComponent {
  createProjectForm: FormGroup<AddProject>;
  isLoading = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.createProjectForm = this.formBuilder.group<AddProject>({
      name: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      teamId: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      imageUrl: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
    });
  }
  addProduct(): void {
    if (this.createProjectForm.valid) {
      const rawProject = this.createProjectForm.getRawValue();
      console.log(rawProject);
      const newProject: Project = {
        ...rawProject,
        teamId: Number(rawProject.teamId),
      };
      console.log(newProject);

      this.projectService.createProject(newProject).subscribe({
        next: () => {
          alert('Product added successfully!');
          this.createProjectForm.reset();
        },
        error: (err) => alert(`Error: ${err.message}`),
      });
    } else {
      alert('Form is invalid. Please check the fields and try again.');
    }
  }
}
