import { Injectable } from '@angular/core';
import { SubTask, CreateOrUpdateSubTask } from '../models/sub-task';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SubTaskService {
  private readonly baseUrl = 'https://api.example.com/tasks'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  /**
   * Get a subtask by task ID and subtask ID.
   * @param taskId Task ID.
   * @param subTaskId Subtask ID.
   */
  getSubTask(taskId: number, subTaskId: number): Observable<SubTask> {
    return this.http.get<SubTask>(
      `${this.baseUrl}/${taskId}/subtasks/${subTaskId}`
    );
  }

  /**
   * Create a new subtask for a task.
   * @param taskId Task ID.
   * @param subTask Subtask creation payload.
   */
  createSubTask(
    taskId: number,
    subTask: CreateOrUpdateSubTask
  ): Observable<SubTask> {
    return this.http.post<SubTask>(
      `${this.baseUrl}/${taskId}/subtasks`,
      subTask
    );
  }

  /**
   * Update an existing subtask.
   * @param taskId Task ID.
   * @param subTaskId Subtask ID.
   * @param subTask Subtask update payload.
   */
  updateSubTask(
    taskId: number,
    subTaskId: number,
    subTask: CreateOrUpdateSubTask
  ): Observable<SubTask> {
    return this.http.put<SubTask>(
      `${this.baseUrl}/${taskId}/subtasks/${subTaskId}`,
      subTask
    );
  }

  /**
   * Delete a subtask by task ID and subtask ID.
   * @param taskId Task ID.
   * @param subTaskId Subtask ID.
   */
  deleteSubTask(taskId: number, subTaskId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${taskId}/subtasks/${subTaskId}`
    );
  }

  /**
   * Get all subtasks for a task.
   * @param taskId Task ID.
   */
  getAllSubTasks(taskId: number): Observable<{ subTasks: SubTask[] }> {
    return this.http.get<{ subTasks: SubTask[] }>(
      `${this.baseUrl}/${taskId}/subtasks/all`
    );
  }
}
