import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, Project, CreateOrUpdateTask } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly baseUrl = 'http://your-backend-url/api/projects';
  constructor(private http: HttpClient) {}

  /**
   * Get a task by project ID and task ID.
   * @param projectId Project ID.
   * @param taskId Task ID.
   */
  getTask(projectId: number, taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${projectId}/tasks/${taskId}`);
  }

  /**
   * Create a new task in a project.
   * @param projectId Project ID.
   * @param task Task creation payload.
   */
  createTask(projectId: number, task: CreateOrUpdateTask): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/${projectId}/tasks`, task);
  }

  /**
   * Update an existing task.
   * @param projectId Project ID.
   * @param taskId Task ID.
   * @param task Task update payload.
   */
  updateTask(
    projectId: number,
    taskId: number,
    task: CreateOrUpdateTask
  ): Observable<Task> {
    return this.http.put<Task>(
      `${this.baseUrl}/${projectId}/tasks/${taskId}`,
      task
    );
  }

  /**
   * Delete a task by project ID and task ID.
   * @param projectId Project ID.
   * @param taskId Task ID.
   */
  deleteTask(projectId: number, taskId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${projectId}/tasks/${taskId}`
    );
  }

  /**
   * Add a responsible user to a task.
   * @param projectId Project ID.
   * @param taskId Task ID.
   * @param responsibleId Responsible user ID.
   */
  addResponsible(
    projectId: number,
    taskId: number,
    responsibleId: number
  ): Observable<Task> {
    return this.http.post<Task>(
      `${this.baseUrl}/${projectId}/tasks/${taskId}/responsibles`,
      { responsibleId }
    );
  }

  /**
   * Get all tasks for a project.
   * @param projectId Project ID.
   */
  getAllTasks(projectId: number): Observable<{ tasks: Task[] }> {
    return this.http.get<{ tasks: Task[] }>(
      `${this.baseUrl}/${projectId}/tasks/all`
    );
  }

  /**
   * Remove a responsible user from a task.
   * @param projectId Project ID.
   * @param taskId Task ID.
   * @param responsibleId Responsible user ID.
   */
  removeResponsible(
    projectId: number,
    taskId: number,
    responsibleId: number
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${projectId}/tasks/${taskId}/responsibles/${responsibleId}`
    );
  }
}
