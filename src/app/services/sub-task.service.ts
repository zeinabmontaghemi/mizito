import { Injectable } from '@angular/core';
import {
  SubTask,
  CreateSubTask,
  GetSubTasksResponse,
} from '../models/sub-task';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SubTaskService {
  private apiUrl = 'http://your-backend-url/api/tasks';

  constructor(private http: HttpClient) {}

  // Get all subtasks for a specific task
  getAllSubTasks(taskId: number): Observable<SubTask[]> {
    return this.http
      .get<GetSubTasksResponse>(`${this.apiUrl}/${taskId}/subtasks/all`)
      .pipe(map((response) => response.subTasks));
  }

  // Get a specific subtask by ID
  getSubTaskById(taskId: number, subTaskId: number): Observable<SubTask> {
    return this.http.get<SubTask>(
      `${this.apiUrl}/${taskId}/subtasks/${subTaskId}`
    );
  }

  // Create a new subtask
  createSubTask(
    taskId: number,
    subTaskData: CreateSubTask
  ): Observable<SubTask> {
    return this.http.post<SubTask>(
      `${this.apiUrl}/${taskId}/subtasks`,
      subTaskData
    );
  }

  // Update an existing subtask
  updateSubTask(
    taskId: number,
    subTaskId: number,
    subTaskData: CreateSubTask
  ): Observable<SubTask> {
    return this.http.put<SubTask>(
      `${this.apiUrl}/${taskId}/subtasks/${subTaskId}`,
      subTaskData
    );
  }

  // Delete a subtask
  deleteSubTask(taskId: number, subTaskId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${taskId}/subtasks/${subTaskId}`
    );
  }
}
