// subtask.model.ts
import { Task } from './task';

export interface SubTask {
  id: number;
  title: string;
  isCompleted: boolean;
  task: Task; // Reuse the existing Task model
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubTask {
  title: string;
  isCompleted: boolean;
}

export interface GetSubTasksResponse {
  subTasks: SubTask[];
}
