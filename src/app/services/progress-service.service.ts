import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchAll } from 'rxjs/operators';
import { Task, Project } from '../models/task';
import { SubTask } from '../models/sub-task';

@Injectable({
  providedIn: 'root',
})
export class ProgressServiceService {
  constructor(private http: HttpClient) {}

  // Fetch all tasks for a project
  getTasksByProjectId(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`/projects/${projectId}/tasks/all`);
  }

  // Fetch all subtasks for a task
  getSubTasksByTaskId(taskId: number): Observable<SubTask[]> {
    return this.http.get<SubTask[]>(`/tasks/${taskId}/subtasks/all`);
  }

  // Calculate project progress
  calculateProjectProgress(projectId: number): Observable<number> {
    return this.getTasksByProjectId(projectId).pipe(
      // Fetch subtasks for each task and calculate progress
      map((tasks) => {
        const progressObservables = tasks.map((task) =>
          this.getSubTasksByTaskId(task.id).pipe(
            map((subtasks) => this.calculateTaskProgress(subtasks)) // Calculate task progress
          )
        );

        return { tasks, progressObservables };
      }),
      // Wait for all task progress calculations to complete
      map(({ tasks, progressObservables }) => {
        return forkJoin(progressObservables).pipe(
          map((taskProgresses) => {
            // Assign progress to each task
            tasks.forEach((task, index) => {
              task.progressPercentage = taskProgresses[index];
            });

            // Calculate overall project progress
            return this.calculateOverallProjectProgress(tasks);
          })
        );
      }),
      // Flatten the nested observable structure
      switchAll()
    );
  }

  // Utility to calculate progress of a single task based on subtasks
  private calculateTaskProgress(subtasks: SubTask[]): number {
    const totalSubtasks = subtasks.length;
    const completedSubtasks = subtasks.filter(
      (subtask) => subtask.isCompleted
    ).length;
    return totalSubtasks === 0 ? 0 : (completedSubtasks / totalSubtasks) * 100;
  }

  // Utility to calculate overall project progress
  private calculateOverallProjectProgress(tasks: Task[]): number {
    const totalTasks = tasks.length;
    const totalProgress = tasks.reduce(
      (sum, task) => sum + task.progressPercentage,
      0
    );
    return totalTasks === 0 ? 0 : totalProgress / totalTasks;
  }
}
