import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, Project, CreateTask, GetTasksResponse } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://your-backend-url/api/projects';
  constructor(private http: HttpClient) {}

  getProjectTasks(projectId: number): Observable<GetTasksResponse> {
    return this.http.get<GetTasksResponse>(
      `${this.apiUrl}/${projectId}/tasks/all`
    );
  }

  getTaskById(projectId: number, taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${projectId}/tasks/${taskId}`);
  }

  createTask(projectId: number, taskData: CreateTask): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/${projectId}/tasks`, taskData);
  }

  updateTask(
    projectId: number,
    taskId: number,
    taskData: CreateTask
  ): Observable<Task> {
    return this.http.put<Task>(
      `${this.apiUrl}/${projectId}/tasks/${taskId}`,
      taskData
    );
  }

  deleteTask(projectId: number, taskId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${projectId}/tasks/${taskId}`
    );
  }
}
